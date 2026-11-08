// Demo catalogue. Brand references and prices are illustrative; this is not an affiliated store.
const products = [
  {
    "id": "exam",
    "name": "Deadline Desk",
    "category": "Meals",
    "price": 2900,
    "description": "A proper sandwich, a crisp apple and water for the next chapter.",
    "image": 0,
    "brands": [
      "Campus kitchen"
    ],
    "contents": [
      "1 chicken, lettuce and tomato sandwich",
      "1 green apple",
      "1 bottle of still water"
    ],
    "serves": 1,
    "mood": "deadline",
    "tag": "The deadline kit",
    "prep": "Ready to eat",
    "tone": "peach",
    "note": "Contains wheat. Ask about ingredients before any real order."
  },
  {
    "id": "bowl",
    "name": "The Study Bowl",
    "price": 2700,
    "description": "A colourful bowl for a proper dinner between deadlines.",
    "contents": [
      "Rice, grilled chicken and avocado",
      "Cucumber, carrots and sesame dressing"
    ],
    "image": 1,
    "category": "Meals",
    "brands": [
      "Campus kitchen"
    ],
    "serves": 1,
    "mood": "hungry",
    "tag": "Fresh from the kitchen",
    "prep": "Ready to eat",
    "tone": "sage",
    "note": "Illustrative menu item. Ask about ingredients and allergens before any real order."
  },
  {
    "id": "salad",
    "name": "Garden Break",
    "price": 2100,
    "description": "Fresh greens, chickpeas and feta. A lighter pause in a long night.",
    "contents": [
      "Leafy greens, chickpeas, cucumber and tomato",
      "Feta and dressing on the side"
    ],
    "image": 2,
    "category": "Meals",
    "brands": [
      "Campus kitchen"
    ],
    "serves": 1,
    "mood": "hungry",
    "tag": "Fresh from the kitchen",
    "prep": "Ready to eat",
    "tone": "sage",
    "note": "Illustrative menu item. Ask about ingredients and allergens before any real order."
  },
  {
    "id": "sandwich",
    "name": "Toast & Go",
    "price": 1900,
    "description": "Toasted vegetables and melted cheese, wrapped for your walk home.",
    "contents": [
      "1 toasted vegetable and cheese sandwich",
      "Cherry tomatoes"
    ],
    "image": 3,
    "category": "Meals",
    "brands": [
      "Campus kitchen"
    ],
    "serves": 1,
    "mood": "hungry",
    "tag": "Fresh from the kitchen",
    "prep": "Ready to eat",
    "tone": "sage",
    "note": "Illustrative menu item. Ask about ingredients and allergens before any real order."
  },
  {
    "id": "noodles",
    "name": "3 a.m. Noodles",
    "category": "Meals",
    "price": 2200,
    "description": "A hot noodle cup and a cold drink. The tiny kitchen classic.",
    "image": 4,
    "brands": [
      "Nongshim",
      "Coca-Cola"
    ],
    "contents": [
      "1 Nongshim Shin Cup",
      "1 Coca-Cola can"
    ],
    "serves": 1,
    "mood": "hungry",
    "tag": "Something warm",
    "prep": "Hot water needed",
    "tone": "rose",
    "note": "Prepare the noodles according to the instructions on the actual package. A kettle is not included."
  },
  {
    "id": "panic",
    "name": "Panic Pack",
    "category": "Study",
    "price": 1800,
    "description": "For the moment your pen gives up before you do.",
    "image": 5,
    "brands": [
      "BIC",
      "Post-it"
    ],
    "contents": [
      "2 BIC pens",
      "1 Post-it note pad",
      "1 small notebook"
    ],
    "serves": 1,
    "mood": "deadline",
    "tag": "Desk essentials",
    "prep": "No setup needed",
    "tone": "sage",
    "note": "Keep your ideas together: a fresh page, a working pen and a place for every reminder."
  },
  {
    "id": "calm",
    "name": "Tea & a Chapter",
    "category": "Drinks",
    "price": 1500,
    "description": "Put the kettle on. The next chapter can wait a minute.",
    "image": 6,
    "brands": [
      "Lipton",
      "Oreo"
    ],
    "contents": [
      "2 Lipton Yellow Label tea bags",
      "1 small Oreo pack"
    ],
    "serves": 1,
    "mood": "reset",
    "tag": "Under 2,000 ₸",
    "prep": "Hot water needed",
    "tone": "butter",
    "note": "A small pause between study sessions. Mug and kettle are not included."
  },
  {
    "id": "group",
    "name": "Roommate Table",
    "category": "Meals",
    "price": 6400,
    "description": "Pizza in the middle. Everyone brings their half-finished assignment.",
    "image": 7,
    "brands": [
      "Coca-Cola"
    ],
    "contents": [
      "1 large cheese pizza",
      "2 Coca-Cola cans"
    ],
    "serves": 4,
    "mood": "roommates",
    "tag": "Share with four",
    "prep": "Ready to share",
    "tone": "peach",
    "note": "Suggested snack portions for four, not four full meals. Drinks can be shared or supplemented separately."
  },
  {
    "id": "charge",
    "name": "Charge Up",
    "category": "Study",
    "price": 4500,
    "description": "A little backup for a very low battery.",
    "image": 8,
    "brands": [
      "Anker"
    ],
    "contents": [
      "1 Anker-style USB power bank",
      "1 USB-C cable"
    ],
    "serves": 1,
    "mood": "deadline",
    "tag": "Battery backup",
    "prep": "Check device port",
    "tone": "sage",
    "note": "Illustrative electronics bundle. Confirm the connector and product specifications before any real purchase."
  },
  {
    "id": "sweet",
    "name": "Sweet Detour",
    "category": "Snacks",
    "price": 1500,
    "description": "A chocolate-and-cookie intermission. No occasion necessary.",
    "image": 9,
    "brands": [
      "Milka",
      "Oreo",
      "Snickers"
    ],
    "contents": [
      "1 Milka chocolate bar",
      "1 small Oreo pack",
      "1 Snickers bar"
    ],
    "serves": 1,
    "mood": "reset",
    "tag": "Small treat",
    "prep": "Ready to snack",
    "tone": "lilac",
    "note": "Illustrative assortment. Check actual packaging for ingredients and allergen information."
  },
  {
    "id": "crunch",
    "name": "One More Episode",
    "category": "Snacks",
    "price": 1700,
    "description": "The assignment is submitted. You have earned the opening credits.",
    "image": 10,
    "brands": [
      "Pringles"
    ],
    "contents": [
      "1 serving of popcorn",
      "1 small Pringles Original tube"
    ],
    "serves": 2,
    "mood": "roommates",
    "tag": "Movie-night pick",
    "prep": "Ready to share",
    "tone": "rose",
    "note": "A snack-sized sharing bundle for two. Add your favourite drinks separately."
  }
];
const plans = {break:['calm','sweet'],owl:['exam','panic'],crew:['group','crunch']};
const deliveryFees = {D1:300,D2:300,D3:500,D4:500};
// Route points follow the paths in the conceptual isometric campus illustration.
const dormRoutes = {
 D1:'M307 829 L476 840 L507 737 L660 645 L430 553 L246 502 L430 420 L599 358 L392 256 L392 225',
 D2:'M307 829 L476 840 L507 737 L660 645 L891 502 L1044 410 L845 328 L883 246 L883 225',
 D3:'M307 829 L476 840 L507 737 L660 645 L891 502 L1044 410 L1229 338 L1283 317',
 D4:'M307 829 L476 840 L507 737 L660 645 L891 502 L1075 594 L1221 553 L1221 532'
};
