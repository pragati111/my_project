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

            // ✅ FIXED MEDIA
            media: [
              { type: "video", url: "/videos/demo.mp4" },
              { type: "image", url: "/images/1.jpg" },
              { type: "image", url: "/images/2.jpg" },
              { type: "image", url: "/images/3.jpg" },
              { type: "image", url: "/images/4.jpg" },
              { type: "image", url: "/images/5.jpg" },
              { type: "video", url: "/videos/demo2.mp4" },
            ],

            // ✅ ALL TYPES INCLUDED
            customizations: [
              {
                id: "size",
                label: "Card Size",
                type: "radio",
                options: ["Standard", "Square", "Mini"],
              },
              {
                id: "printType",
                label: "Printing Type",
                type: "radio",
                options: ["Single Side", "Double Side"],
              },
              {
                id: "finish",
                label: "Finish",
                type: "checkbox",
                options: ["Matte", "Glossy", "Lamination"],
              },
              {
                id: "quantity",
                label: "Select Quantity",
                type: "dropdown",
                options: ["100", "200", "500", "1000"],
              },
              {
                id: "name",
                label: "Name to Print",
                type: "text",
                placeholder: "Enter your name",
              },
              {
                id: "notes",
                label: "Instructions",
                type: "textarea",
                placeholder: "Any special request...",
              },
              {
                id: "frontDesign",
                label: "Upload Front Design",
                type: "file",
              },
              {
                id: "backDesign",
                label: "Upload Back Design",
                type: "file",
                showIf: {
                  field: "printType",
                  value: "Double Side",
                },
              },
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
            customizations: [
              {
                id: "paperType",
                label: "Paper Type",
                type: "radio",
                options: ["Matte", "Glossy"],
              },
              {
                id: "color",
                label: "Print Color",
                type: "dropdown",
                options: ["Black", "Color"],
              },
              {
                id: "logo",
                label: "Upload Logo",
                type: "file",
              },
              {
                id: "notes",
                label: "Instructions",
                type: "textarea",
              },
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
            customizations: [
              {
                id: "size",
                label: "Size",
                type: "dropdown",
                options: ["A4", "A5", "DL"],
              },
              {
                id: "window",
                label: "Window Type",
                type: "radio",
                options: ["With Window", "Without Window"],
              },
              {
                id: "logo",
                label: "Upload Logo",
                type: "file",
              },
            ],
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
              { type: "video", url: "/videos/demo.mp4" },
            ],
            customizations: [
              {
                id: "size",
                label: "Size",
                type: "radio",
                options: ["A4", "A5"],
              },
              {
                id: "paper",
                label: "Paper Quality",
                type: "dropdown",
                options: ["100 GSM", "200 GSM"],
              },
              {
                id: "design",
                label: "Upload Design",
                type: "file",
              },
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
            customizations: [
              {
                id: "fold",
                label: "Fold Type",
                type: "radio",
                options: ["Bi-Fold", "Tri-Fold"],
              },
              {
                id: "pages",
                label: "Pages",
                type: "dropdown",
                options: ["2", "4", "6"],
              },
              {
                id: "design",
                label: "Upload Design",
                type: "file",
              },
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
            customizations: [
              {
                id: "size",
                label: "Poster Size",
                type: "radio",
                options: ["A3", "A2"],
              },
              {
                id: "lamination",
                label: "Lamination",
                type: "checkbox",
                options: ["Glossy", "Matte"],
              },
              {
                id: "design",
                label: "Upload Design",
                type: "file",
              },
            ],
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
            ],
            customizations: [
              {
                id: "size",
                label: "Size",
                type: "dropdown",
                options: ["S", "M", "L", "XL"],
              },
              {
                id: "color",
                label: "Color",
                type: "radio",
                options: ["Black", "White", "Blue"],
              },
              {
                id: "design",
                label: "Upload Design",
                type: "file",
              },
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
            customizations: [
              {
                id: "color",
                label: "Color",
                type: "radio",
                options: ["Black", "Red", "Blue"],
              },
              {
                id: "logo",
                label: "Upload Logo",
                type: "file",
              },
              {
                id: "text",
                label: "Text",
                type: "text",
              },
            ],
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
            customizations: [
              {
                id: "color",
                label: "Color",
                type: "radio",
                options: ["White", "Black"],
              },
              {
                id: "photo",
                label: "Upload Photo",
                type: "file",
              },
              {
                id: "message",
                label: "Message",
                type: "text",
              },
            ],
          },
        ],
      },
    ],
  },
];