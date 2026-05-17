#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────
# dev.sh — Start the full Planote local development environment
#
# What this script does:
#   1. Checks prerequisites (Docker, Node, pnpm, .env files)
#   2. Starts Docker services (Postgres + Redis)
#   3. Waits for both to be healthy (not just started)
#   4. Runs Prisma database migrations
#   5. Starts all app servers in parallel via Turborepo
#   6. Tears everything down cleanly on Ctrl+C
#
# Usage: ./dev.sh
# ──────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Colours ────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Colour

# ── Helpers ────────────────────────────────────────────────────────────
log()     { echo -e "${BLUE}[planote]${NC} $1"; }
success() { echo -e "${GREEN}[planote]${NC} ✓ $1"; }
warn()    { echo -e "${YELLOW}[planote]${NC} ⚠ $1"; }
error()   { echo -e "${RED}[planote]${NC} ✗ $1"; exit 1; }
section() { echo -e "\n${BOLD}${CYAN}── $1 ──────────────────────────────${NC}"; }

# ── Header ─────────────────────────────────────────────────────────────
echo -e ""
echo -e "${BOLD}${CYAN}  ██████╗ ██╗      █████╗ ███╗   ██╗ ██████╗ ████████╗███████╗${NC}"
echo -e "${BOLD}${CYAN}  ██╔══██╗██║     ██╔══██╗████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝${NC}"
echo -e "${BOLD}${CYAN}  ██████╔╝██║     ███████║██╔██╗ ██║██║   ██║   ██║   █████╗  ${NC}"
echo -e "${BOLD}${CYAN}  ██╔═══╝ ██║     ██╔══██║██║╚██╗██║██║   ██║   ██║   ██╔══╝  ${NC}"
echo -e "${BOLD}${CYAN}  ██║     ███████╗██║  ██║██║ ╚████║╚██████╔╝   ██║   ███████╗${NC}"
echo -e "${BOLD}${CYAN}  ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝${NC}"
echo -e "${CYAN}  Local Development Environment${NC}\n"

# ── Step 1: Prerequisites ──────────────────────────────────────────────
section "Checking prerequisites"

if ! command -v docker &> /dev/null; then
  error "Docker not found. Install Docker Desktop: https://www.docker.com/products/docker-desktop"
fi

if ! docker info &> /dev/null 2>&1; then
  error "Docker daemon is not running. Please start Docker Desktop."
fi
success "Docker is running"

if ! command -v node &> /dev/null; then
  error "Node.js not found. Install from https://nodejs.org (v20+)"
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  error "Node.js v20+ required. Found: $(node -v)"
fi
success "Node.js $(node -v)"

if ! command -v pnpm &> /dev/null; then
  warn "pnpm not found. Installing..."
  npm install -g pnpm
fi
success "pnpm $(pnpm -v)"

# ── Step 2: .env files ─────────────────────────────────────────────────
section "Checking environment files"

if [ ! -f "apps/api/.env" ]; then
  warn "apps/api/.env not found — copying from .env.example"
  cp apps/api/.env.example apps/api/.env
  warn "Edit apps/api/.env with your actual values before using auth or AI features."
fi

if [ ! -f "apps/web/.env.local" ]; then
  warn "apps/web/.env.local not found — copying from .env.example"
  cp apps/web/.env.example apps/web/.env.local
  warn "Edit apps/web/.env.local with your Clerk keys when you start Milestone 2."
fi
success "Environment files ready"

# ── Step 3: Install dependencies ──────────────────────────────────────
section "Installing dependencies"
pnpm install --frozen-lockfile 2>/dev/null || pnpm install
success "Dependencies installed"

# ── Step 4: Docker services ────────────────────────────────────────────
section "Starting Docker services"
docker compose up -d

log "Waiting for Postgres to be healthy..."
ATTEMPTS=0
until docker compose exec -T postgres pg_isready -U planote -d planote &> /dev/null; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ $ATTEMPTS -gt 30 ]; then
    error "Postgres failed to start after 30 attempts. Run: docker compose logs postgres"
  fi
  sleep 1
done
success "Postgres ready on :5432"

log "Waiting for Redis to be healthy..."
ATTEMPTS=0
until docker compose exec -T redis redis-cli ping &> /dev/null; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [ $ATTEMPTS -gt 15 ]; then
    error "Redis failed to start. Run: docker compose logs redis"
  fi
  sleep 1
done
success "Redis ready on :6379"

# ── Step 5: Database migrations ────────────────────────────────────────
section "Running database migrations"

if [ -f "apps/api/prisma/schema.prisma" ]; then
  (cd apps/api && npx prisma migrate dev --skip-seed 2>&1 | sed 's/^/  /')
  success "Migrations applied"
else
  warn "No Prisma schema found yet — skipping migrations (will run in Milestone 3)"
fi

# ── Step 6: Start all servers ──────────────────────────────────────────
section "Starting development servers"
echo ""
echo -e "  ${GREEN}Web app${NC}   → http://localhost:3000"
echo -e "  ${GREEN}API${NC}       → http://localhost:4000"
echo -e "  ${GREEN}Health${NC}    → http://localhost:4000/health"
echo ""
echo -e "  Press ${BOLD}Ctrl+C${NC} to stop all services"
echo ""

# ── Cleanup on exit ────────────────────────────────────────────────────
cleanup() {
  echo ""
  section "Shutting down"
  docker compose stop
  success "All services stopped. Database data is preserved."
  echo ""
}
trap cleanup EXIT INT TERM

# Run turbo dev — starts all apps in parallel
pnpm dev
