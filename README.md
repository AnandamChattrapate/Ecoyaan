###
Ecoyaan Checkout Flow

A simple checkout flow built with Next.js where users can review their cart, enter shipping details, and confirm payment.

Tech Stack
Next.js 14 (App Router)-for server-side rendering and routing

Zustand - Lightweight state management

React Hook Form - Form validation

Tailwind CSS - Styling

###
Key Features
Server-side rendering for cart data

Multi-step checkout (Cart → Shipping → Payment → Success)

Form validation with error messages

Responsive design (mobile & desktop)

Progress tracker showing current step

###
How to Run Locally
- Clone the repo
- git clone <your-repo-url>
- cd ecoyaan-checkout
- Install dependencies

- npm install
- Add product images
- Place these images in the public folder:
    bamboo.jpg
    cottonBag.jpg

Start the server

npm run dev
Open in browser
###
Navigate to http://localhost:3000/cart

Project Structure
text
├── app/                    # Next.js app router
│   ├── api/               # Mock API endpoint
│   ├── cart/              # Cart page
│   ├── shipping/          # Address form
│   ├── payment/           # Order confirmation
│   └── success/           # Success page
├── components/            # Reusable components
├── store/                 # Zustand store
└── public/                # Images

###
Checkout Flow

- Cart Page (/cart) - View items, see total →  Click "Proceed"

- Shipping Page (/shipping) - Fill address form → Click "Continue"

- Payment Page (/payment) - Review order →  Click "Pay"

- Success Page (/success) - Order confirmed

###
State Management (Zustand)
The store manages:
- Cart items and pricing
- Shipping address
- Current checkout stage

###
Form Validation Rules
- Full Name: Required, 4-30 characters
- Email: Required, valid format
- Phone: Required, 10 digits
- PIN Code: Required, 6 digits
- City/State: Required, min 2 characters

###
- API Endpoint
GET /api/cart - Returns mock cart data with items, shipping fee, and discounts

###
Dependencies
"axios": "^1.13.6",
"next": "16.1.6",
"react": "19.2.3",
"react-dom": "19.2.3",
"react-hook-form": "^7.71.2",
"zustand": "^5.0.11"

