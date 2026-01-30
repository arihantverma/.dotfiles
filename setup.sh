#!/bin/bash
# Bootstrap script for setting up dotfiles on a new machine

set -e  # Exit on any error

echo "==> Starting dotfiles setup..."

# Install Homebrew (macOS)
if ! command -v brew &> /dev/null; then
    echo "==> Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    echo "==> Homebrew already installed"
fi

# Install stow
if ! command -v stow &> /dev/null; then
    echo "==> Installing stow..."
    brew install stow
else
    echo "==> Stow already installed"
fi

# Install oh-my-zsh
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    echo "==> Installing Oh My Zsh..."
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
else
    echo "==> Oh My Zsh already installed"
fi

# Install pure prompt
if [ ! -d "$HOME/.zsh/pure" ]; then
    echo "==> Installing Pure prompt..."
    mkdir -p ~/.zsh
    git clone https://github.com/sindresorhus/pure.git ~/.zsh/pure
else
    echo "==> Pure prompt already installed"
fi

# Install zsh-syntax-highlighting plugin
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
if [ ! -d "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting" ]; then
    echo "==> Installing zsh-syntax-highlighting..."
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
else
    echo "==> zsh-syntax-highlighting already installed"
fi

# Back up existing configs if they exist and aren't symlinks
echo "==> Backing up existing configs..."
[ -f "$HOME/.zshrc" ] && [ ! -L "$HOME/.zshrc" ] && mv "$HOME/.zshrc" "$HOME/.zshrc.bak"
[ -d "$HOME/.config/nvim" ] && [ ! -L "$HOME/.config/nvim" ] && mv "$HOME/.config/nvim" "$HOME/.config/nvim.bak"

# Stow dotfiles
echo "==> Stowing dotfiles..."
cd "$(dirname "$0")"
stow -t ~ nvim
stow -t ~ zsh

echo "==> Done! Restart your terminal or run: source ~/.zshrc"
