export const categories = [
  {
    name: "Print & Marketing",
    children: [
      {
        name: "Business Essentials",
        items: [
          {
            id: "pm-bc-1",
            name: "Business Cards",
            image: "/images/business.jpg",
            popular: true,
            price: 499,
            originalPrice: 799,
            rating: 4.6,
            reviews: 320,
            media: [
              { type: "video", url: "/videos/demo.mp4" },
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo2.mp4" },
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo2.mp4" },
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo2.mp4" },
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo2.mp4" },
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
            ],
          },
          {
            id: "pm-lh-1",
            name: "Letterheads",
            image: "/images/letterhead.jpg",
            price: 699,
            originalPrice: 999,
            rating: 4.4,
            reviews: 210,
            media: [
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/business.jpg" },
            ],
          },
          {
            id: "pm-env-1",
            name: "Envelopes",
            image: "/images/envelope.jpg",
            price: 299,
            originalPrice: 499,
            rating: 4.2,
            reviews: 150,
            media: [{ type: "image", url: "/images/envelope.jpg" }],
          },
        ],
      },
      {
        name: "Marketing Materials",
        items: [
          {
            id: "pm-fly-1",
            name: "Flyers",
            image: "/images/business.jpg",
            price: 399,
            originalPrice: 599,
            rating: 4.3,
            reviews: 180,
            media: [
              { type: "image", url: "/images/business.jpg" },
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
            ],
          },
          {
            id: "pm-bro-1",
            name: "Brochures",
            image: "/images/letterhead.jpg",
            price: 799,
            originalPrice: 1199,
            rating: 4.5,
            reviews: 260,
            media: [
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
            ],
          },
          {
            id: "pm-pos-1",
            name: "Posters",
            image: "/images/envelope.jpg",
            price: 199,
            originalPrice: 299,
            rating: 4.1,
            reviews: 90,
            media: [{ type: "image", url: "/images/envelope.jpg" }],
          },
        ],
      },
    ],
  },

  {
    name: "Fashion & Textile",
    children: [
      {
        name: "Clothing",
        items: [
          {
            id: "ft-tsh-1",
            name: "Custom T-Shirts",
            image: "/images/business.jpg",
            price: 999,
            originalPrice: 1499,
            rating: 4.7,
            reviews: 540,
            media: [
              { type: "image", url: "/images/business.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
            ],
          },
          {
            id: "ft-hod-1",
            name: "Hoodies",
            image: "/images/letterhead.jpg",
            price: 1499,
            originalPrice: 1999,
            rating: 4.6,
            reviews: 410,
            media: [
              { type: "image", url: "/images/letterhead.jpg" },
              { type: "image", url: "/images/business.jpg" },
            ],
          },
          {
            id: "ft-cap-1",
            name: "Caps",
            image: "/images/envelope.jpg",
            price: 299,
            originalPrice: 499,
            rating: 4.3,
            reviews: 120,
            media: [{ type: "image", url: "/images/envelope.jpg" }],
          },
        ],
      },
    ],
  },

  {
    name: "Office & Store Branding",
    children: [
      {
        name: "Indoor Branding",
        items: [
          {
            id: "os-wall-1",
            name: "Wall Graphics",
            image: "/images/business.jpg",
            price: 1299,
            originalPrice: 1799,
            rating: 4.5,
            reviews: 300,
            media: [
              { type: "image", url: "/images/business.jpg" },
              { type: "image", url: "/images/envelope.jpg" },
            ],
          },
          {
            id: "os-sign-1",
            name: "Office Signage",
            image: "/images/letterhead.jpg",
            price: 999,
            originalPrice: 1399,
            rating: 4.4,
            reviews: 220,
            media: [{ type: "image", url: "/images/letterhead.jpg" }],
          },
        ],
      },
    ],
  },

  {
    name: "Signages",
    children: [
      {
        name: "Outdoor Signages",
        items: [
          {
            id: "sg-led-1",
            name: "LED Sign Boards",
            image: "/images/business.jpg",
            price: 2499,
            originalPrice: 2999,
            rating: 4.6,
            reviews: 180,
            media: [
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
            ],
          },
          {
            id: "sg-glow-1",
            name: "Glow Sign Boards",
            image: "/images/letterhead.jpg",
            price: 1999,
            originalPrice: 2499,
            rating: 4.5,
            reviews: 140,
            media: [{ type: "image", url: "/images/letterhead.jpg" }],
          },
        ],
      },
    ],
  },

  {
    name: "Corporate Gifts & Bags",
    children: [
      {
        name: "Corporate Gifts",
        items: [
          {
            id: "cg-mug-1",
            name: "Custom Mugs",
            image: "/images/business.jpg",
            price: 399,
            originalPrice: 599,
            rating: 4.4,
            reviews: 210,
            media: [
              { type: "image", url: "/images/business.jpg" },
              { type: "video", url: "/videos/demo.mp4" },
            ],
          },
          {
            id: "cg-pen-1",
            name: "Branded Pens",
            image: "/images/letterhead.jpg",
            price: 199,
            originalPrice: 299,
            rating: 4.2,
            reviews: 130,
            media: [{ type: "image", url: "/images/letterhead.jpg" }],
          },
        ],
      },
    ],
  },
];