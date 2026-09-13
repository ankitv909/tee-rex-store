# TeeRex Store

A responsive React shopping-cart application built for the GeekTrust **TeeRex Store** frontend challenge.

The app focuses on product discovery, multi-criteria filtering, cart state, stock-aware quantity controls, and persistence in the browser.

## Features

### Product Catalogue

- Loads products from a remote API
- Search by product name
- Filter products by color, gender, price, and type
- Responsive product grid
- Mobile-friendly filter controls

### Shopping Cart

- Add products to cart
- Change item quantity
- Remove cart items
- Calculate total price automatically
- Prevent quantity changes beyond available stock
- Persist cart state with `localStorage`
- User feedback through toast notifications

## Tech Stack

- React
- React Router
- Context API
- CSS3
- React Icons
- React Toastify
- LocalStorage

## Architecture

The application uses React Context for shared cart state and React Router for client-side navigation. Cart persistence is handled locally in the browser, keeping the challenge implementation frontend-only.

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

### Test

```bash
npm test -- --watchAll=false
```

### Production build

```bash
npm run build
```

## What This Project Demonstrates

- Component-based React UI development
- Global client-side state without Redux
- Derived cart totals and stock validation
- Search and compound filtering UX
- Browser persistence
- Responsive e-commerce layouts

## Scope

This repository is a frontend coding-challenge implementation. It does not include a production backend, payment processing, or user-account system.
