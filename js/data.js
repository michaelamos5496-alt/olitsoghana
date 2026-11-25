/* =====================================================================
   SITE CONTENT — edit here. Empty values ("") hide that part.
   The MENU below was transcribed from the Olisto flyers. Items marked
   "CHECK" in comments could not be read clearly — please confirm them.
   ===================================================================== */
const SITE = {
  name: "Olisto",
  logoText: "OLISTO",                     // text wordmark (only used when there is no logo image)
  logo: "assets/images/logo-light.png",   // brand logo (cream, transparent) for dark backgrounds
  logoTag: "",                            // the logo image already contains "Bakery | Bistro | Bar"

  /* Contact — from the flyers and packaging */
  phone: "+233 544241993",                // "Number to order: call or WhatsApp" on the flyers
  phone2: "+233 597434722",               // call line (flyers + bag)
  phone3: "+233 593268843",               // second number on the bag / Instagram RSVP ("" to hide)
  email: "",                              // e.g. "hello@olisto.com"
  address: "East Legon Underbridge, Accra",
  hours: [],                              // e.g. [{ days: "Mon – Fri", time: "8:00 am – 9:00 pm" }]
  mapEmbed: "",                           // optional: Google Maps → Share → Embed a map → paste the src="…" link. Blank = built from the address.
  social: [                               // handles are from the brand card — CHECK the Snapchat and TikTok links
    { label: "Instagram", handle: "@olistoghana", url: "https://www.instagram.com/olistoghana" },
    { label: "Snapchat",  handle: "Olistogh",     url: "https://www.snapchat.com/add/olistogh" },
    { label: "TikTok",    handle: "@olistoghana", url: "https://www.tiktok.com/@olistoghana" }
  ],

  headline: "A Taste of Ghana, Served with Heart",
  intro: "Authentic Ghanaian cooking, made fresh and served with warmth.",
  heroCta: { label: "Order online", href: "menu.html" },   // main button on the hero ("" label hides it)

  heroVideos: [                           // background videos: they crossfade into each other and loop
    "assets/videos/hero video.mp4",
    "assets/videos/hero video 2.mp4"
  ],
  heroImage: "",                          // optional still shown until the video loads / if it can't play

  notice: { label: "Reservation notice", text: "" },   // beige bar at the very top; text "" hides it

  whatsapp: "233544241993",               // country code, no "+" → every online order and reservation is sent to this WhatsApp number
  currency: "GH₵",

  links: [                                // full-screen menu
    { label: "Home",    href: "index.html" },
    { label: "Menu",    href: "menu.html" },
    { label: "About",   href: "index.html#about" },
    { label: "Reservations", href: "index.html#reservations" },
    { label: "Contact", href: "index.html#contact" }
  ],

  /* About — the brand story, as written on the Olisto brand card */
  about: {
    eyebrow: "Our story",
    title: "Rooted in simplicity, inspired by the earth.",
    text: [
      "OLISTO returns with a renewed identity and a calm, curated space to gather, savor, and slow down.",
      "Our menu reflects the same intention: fresh bakes, thoughtful dishes, and crafted drinks, all made to nourish and connect.",
      "Welcome to OLISTO rebirth!!"
    ],
    video: "assets/videos/hero video 2.mp4",   // framed clip beside the story ("" to use a photo instead)
    image: "",                                  // optional photo, e.g. "assets/images/about.jpg"
    pillars: [                                  // from "Minimal. Warm. Grounded in experience."
      { title: "Minimal", text: "" },
      { title: "Warm", text: "" },
      { title: "Grounded in experience", text: "" }
    ],
    cta: "View our menu"
  },

  /* "The Experience" section (sample copy — replace with what you really offer) */
  experience: {
    eyebrow: "The experience",
    title: "More than a meal",
    text: "Step through our doors into a place made for long conversations, good music and food that keeps you coming back. Stay for dinner, take it home, or bring us to your celebration.",
    items: [
      { title: "Bakery",               text: "Fresh bakes and pastries, ready to enjoy here or take away." },
      { title: "Bistro",               text: "Warm lighting, comfortable seating and a relaxed room for every occasion." },
      { title: "Bar",                  text: "Handcrafted drinks to go with good food and better conversation." },
      { title: "Takeaway & delivery",  text: "Your favourites, packed fresh and brought to your door." }
    ],
    images: [                                    // photos of the space: they crossfade slowly and loop (add as many as you like)
      "assets/images/space-1.jpg",
      "assets/images/space-2.jpg"
    ],
    alt: "The Olisto dining room, set for a feast",
    image: "",                                   // (alternative) a single still photo
    video: ""                                    // (alternative) a video, used only when no photos are set
  },

  /* Reservations band (sample copy). "Book now" opens WhatsApp when `whatsapp` above is set,
     or your own booking page if you put its address in bookUrl. "Call to reserve" needs `phone` above. */
  reservations: {
    eyebrow: "Reservations",
    title: "Bookings, celebrations and everything else",
    text: "Reserve your table for an evening of honest Ghanaian cooking, good company and a warm welcome. Tell us the date and how many are coming, and we'll take care of the rest.",
    note: "For large groups or private events, please contact us directly.",
    bookUrl: ""                                   // optional: e.g. a booking-platform link (overrides WhatsApp)
  },

  /* ONLINE ORDERING & DELIVERY — orders are sent to `whatsapp` above as a ready-to-send message.
     Anything left blank/empty is simply not shown. */
  ordering: {
    delivery: true,                 // offer delivery
    pickup: true,                   // offer pickup
    deliveryFee: null,              // number in GH₵ (e.g. 15), or null = "we'll confirm the fee on WhatsApp"
    freeDeliveryOver: null,         // e.g. 200 → free delivery on orders of GH₵200+ (null = never)
    minOrder: 0,                    // minimum basket value for delivery (0 = none)
    areas: [],                      // optional: [{ name: "East Legon", fee: 20 }, { name: "Osu", fee: 15 }]
    payments: ["Cash", "Mobile Money"],
    momoNumber: "",                 // shown to customers who choose Mobile Money, e.g. "0240000000"
    hours: "",                      // e.g. "Orders taken daily 11:00 – 20:00"
    prepTime: "",                   // e.g. "30–45 minutes"
    image: "assets/images/olisto-bag.jpg",   // photo beside the "Order online" section
    note: "We confirm every order on WhatsApp before we start cooking."
  },

  menuTitle: "Our Menu",
  menuIntro: "Fresh bakes, thoughtful dishes and crafted drinks, all made to nourish and connect.",
  menuNote: "Prices in Ghana cedis. Please tell us about any allergies before ordering."
};

/* `note` is shown under the category heading */
const CATEGORIES = [
  { id: "wings",    label: "Chicken Wings",     note: "Choose your flavour: Hot & Spicy · Sweet & Chilli · Honey Glazed · Honey Mustard · Sweet & Spicy. Add your flavour in the notes when you order." },
  { id: "combo",    label: "Meal Combo",        note: "Available Tuesdays & Thursdays only." },
  { id: "platters", label: "Combo Platters",    note: "Great taste. Generous portions. Made for every occasion." },
  { id: "chops",    label: "Small Chops",       note: "" },
  { id: "munch",    label: "Munch Boxes",       note: "" },
  { id: "trays",    label: "Tray Packages",     note: "Trays are for 5 or 10 people. Each tray comes with 5 complimentary bottles of juice and shito." },
  { id: "birthday", label: "Birthday Packages", note: "Celebrate with great food. Every package comes with a free card." },
  { id: "dine",     label: "Birthday Dine Packages", note: "For 7 or 10 people and above. Price is per head, so set the quantity to the number of guests. You choose one from each section: tell us your choices in the notes. We can also make it a buffet setup, just let us know." }
];

/* Tray prices: [item, Mini price, Large price] */
const TRAYS = [
  ["Egg Fried Rice", 450, 750], ["Jollof Rice", 450, 750], ["Spicy Chicken Wings", 450, 750],
  ["Salad", 350, 600], ["Plantain", 200, 400], ["Pasta", 450, 650], ["Peppered Rice", 450, 750],
  ["Beef Sauce", 550, 900], ["Spicy Turkey", 550, 900], ["Peppered Fish", 450, 800]
];

/* tags: "spicy", "veg"  ·  image: "assets/images/x.jpg" (optional thumbnail) */
const DISHES = [
  /* Chicken wings */
  { cat: "wings", name: "Chicken Wings · 5 pcs",  price: 80,  tags: ["spicy"], desc: "Crispy. Juicy. Flavorful. Made to crave." },
  { cat: "wings", name: "Chicken Wings · 10 pcs", price: 145, tags: ["spicy"], desc: "Crispy. Juicy. Flavorful. Made to crave." },
  { cat: "wings", name: "Chicken Wings · 15 pcs", price: 235, tags: ["spicy"], desc: "Crispy. Juicy. Flavorful. Made to crave." },
  { cat: "wings", name: "Chicken Wings · 20 pcs", price: 315, tags: ["spicy"], desc: "Crispy. Juicy. Flavorful. Made to crave." },
  { cat: "wings", name: "Chicken Wings · 40 pcs", price: 535, tags: ["spicy"], desc: "Crispy. Juicy. Flavorful. Made to crave." },

  /* Meal combo (Tuesdays & Thursdays only) */
  { cat: "combo", name: "5 Wings + Chicken or Beef Shawarma + Drink", price: 180, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Burger + Drink",                   price: 190, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Fried Rice + Drink",               price: 150, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Jollof + Drink",                   price: 150, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Assorted Fried Rice + Drink",      price: 170, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Assorted Jollof + Drink",          price: 170, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Assorted Noodles + Drink",         price: 170, desc: "Tuesdays & Thursdays only." },
  { cat: "combo", name: "5 Wings + Mixed Shawarma + Drink",           price: 190, desc: "Tuesdays & Thursdays only." },

  /* Combo platters */
  { cat: "platters", name: "Olisto Combo Platter Takeout", price: 870, desc: "Fully loaded, feeds 3 to 5 people. Jollof rice, fried rice, 4 drumsticks, 1 turkey, 3 samosas, 3 spring rolls, 2 eggs, 2 chicken kebabs, plantain, coleslaw, 4 sausages, shito and sautéed veggies." },
  { cat: "platters", name: "Combo Platter",                price: 320, desc: "Jollof rice, fried rice, 3 sausages, 2 eggs, plantain, coleslaw, sautéed veggies and shito." },

  /* Small chops — CHECK: packages 6/7 and the Extras list were too small to read */
  { cat: "chops", name: "Small Chops · Package 1", price: 65, desc: "Samosa, spring rolls, puff puff, chicken wings." },
  { cat: "chops", name: "Small Chops · Package 2", price: 75, desc: "Samosa, puff puff, spring rolls, chicken wings, gizzard." },
  { cat: "chops", name: "Small Chops · Package 3", price: 80, desc: "Samosa, spring rolls, meat pie, chicken wings, sausage." },
  { cat: "chops", name: "Small Chops · Package 4", price: 85, desc: "Samosa, spring rolls, meat pie, chicken wings, gizzard." },
  { cat: "chops", name: "Small Chops · Package 5", price: 95, desc: "Samosa, spring rolls, meat pie, chicken wings, sausage, shawarma." },

  /* Munch boxes — transcribed from the Munch Box flyer */
  { cat: "munch", name: "Munch Box 1", price: 350, desc: "Assorted fried rice or jollof, Olisto mini burger or shawarma, spicy chicken wings, samosa, spring rolls, juice (box or fresh juice)." },
  { cat: "munch", name: "Munch Box 2", price: 480, desc: "Assorted fried rice or jollof, Olisto mini burger, shawarma (chicken, beef or mixed), assorted noodles, samosa, spring rolls, juice (box or fresh juice)." },
  { cat: "munch", name: "Munch Box 3", price: 600, desc: "Assorted fried rice or jollof, Olisto mini burger, assorted noodles, spicy chicken wings, shawarma (chicken or beef), spring rolls, juice (box or fresh juice)." },
  { cat: "munch", name: "Munch Box 4", price: 495, desc: "Assorted fried rice or jollof, Olisto mini burger, spicy chicken wings, Olisto loaded shawarma, samosa, spring rolls, juice (box or fresh juice)." },
  { cat: "munch", name: "Munch Box 5", price: 680, desc: "Assorted fried rice or jollof, Olisto mini burger, assorted noodles, spicy chicken wings, Olisto loaded shawarma, samosa, spring rolls, juice (box or fresh juice)." },

  /* Tray packages (Mini and Large for each item, plus party snacks by the 50) */
  ...TRAYS.flatMap(([n, mini, large]) => [
    { cat: "trays", name: `${n} Tray · Mini`,  price: mini,  desc: "Comes with 5 complimentary bottles of juice and shito." },
    { cat: "trays", name: `${n} Tray · Large`, price: large, desc: "Comes with 5 complimentary bottles of juice and shito." }
  ]),
  { cat: "trays", name: "Spring Rolls · 50 pcs",    price: 450, desc: "" },
  { cat: "trays", name: "Samosa · 50 pcs",          price: 500, desc: "" },
  { cat: "trays", name: "Kosua ne Nkoko · 50 pcs",  price: 500, desc: "" },   // CHECK spelling and price of this item

  /* Birthday packages — transcribed from the Birthday Packages flyer */
  { cat: "birthday", name: "Birthday Package 1",  price: 350,  desc: "Jollof rice, fried rice, chicken wings, juice, salad, free card." },
  { cat: "birthday", name: "Birthday Package 2",  price: 450,  desc: "Jollof rice, fried rice, pasta, spicy chicken wings, salad, juice, fruit of the day, free card." },
  { cat: "birthday", name: "Birthday Package 3",  price: 650,  desc: "Jollof rice, fried rice, pasta, plantain, chicken wings, spring roll or samosa, salad, juice, sweets, fruit of the day, free card." },
  { cat: "birthday", name: "Birthday Package 4",  price: 850,  desc: "Jollof rice, egg fried rice, pasta, plantain, peppered rice, spicy chicken wings, spring roll or samosa, salad, juice, sweets, fruit of the day, 2 balloons and a free card." },
  { cat: "birthday", name: "Birthday Package 5", price: 1000, desc: "Jollof rice, egg fried rice, pasta, plantain, spicy chicken wings, spring roll or samosa, peppered rice, fruit of the day, small wine, salad, juice, parfait, mini cake, 2 balloons and a free card." },
  { cat: "birthday", name: "Birthday Package 6", price: 1200, desc: "Jollof rice, egg fried rice, pasta, plantain, asun rice or native rice, spring roll or samosa, spicy chicken wings, big wine, big juice, salad, parfait, fruit of the day, mini cake, 3 balloons and a free card." },

  /* Birthday dine packages — price is PER HEAD (quantity = number of guests); transcribed from the Birthday Dine Packages flyer */
  { cat: "dine", name: "Birthday Dine Package 1", price: 250, unit: " per head", desc: "Main course (choose one): Jollof Rice, Egg Fried Rice, Peppered Rice, Noodles, Pasta, Yam, Assorted Fried Rice, Assorted Jollof, French Fries.\nProtein (choose one): Spicy Chicken Wings, Sweet & Hot Wing Sauce, Beef in Chilli, Spicy Turkey.\nCocktail or fresh juice (choose one)." },
  { cat: "dine", name: "Birthday Dine Package 2", price: 350, unit: " per head", desc: "Starter (choose one): Spring roll, samosa or puff-puff.\nMain course (choose one): Jollof Rice, Egg Fried Rice, Peppered Rice, Noodles, Pasta, Yam, Assorted Fried Rice, Assorted Jollof, French Fries.\nProtein (choose one): Spicy Chicken Wings, Sweet & Hot Wing Sauce, Beef in Chilli, Spicy Turkey.\nCocktail or fresh juice (choose one).\nPlus a tray of salad." },
  { cat: "dine", name: "Birthday Dine Package 3", price: 450, unit: " per head", desc: "Starter (choose one): Spring roll, samosa, puff-puff or spicy gizzard.\nMain course (choose one): Jollof Rice, Egg Fried Rice, Peppered Rice, Noodles, Pasta, Yam, Assorted Jollof Rice, Assorted Fried Rice, French Fries, Salad.\nProtein (choose one): Spicy Chicken Wings, Sweet & Hot Wing Sauce, Beef in Chilli, Spicy Turkey.\nCocktail or fresh juice (choose one).\nPlus a mini cake or a bottle of wine." }
];
