// Words picked to be easy to act out or draw.
export const wordCategories = [
  {
    id: "animals",
    label: "Animals",
    words: [
      "elephant", "giraffe", "kangaroo", "penguin", "octopus", "crocodile",
      "butterfly", "snake", "monkey", "owl", "shark", "frog", "camel", "zebra",
      "peacock", "tortoise", "bat", "spider", "jellyfish", "flamingo",
      "gorilla", "lion", "rabbit", "snail", "dolphin", "parrot", "horse",
      "chicken", "bee", "crab", "hedgehog", "squirrel", "whale", "ostrich", "goat",
    ],
  },
  {
    id: "food",
    label: "Food",
    words: [
      "pizza", "banana", "popcorn", "ice cream", "spaghetti", "sandwich",
      "pancake", "watermelon", "hamburger", "doughnut", "pineapple",
      "chocolate", "cupcake", "sushi", "hot dog", "coconut", "boiled egg",
      "carrot", "cheese", "corn on the cob", "cookie", "noodles", "lollipop",
      "avocado", "chilli pepper", "bread", "mango", "plantain", "jollof rice",
      "birthday cake", "french fries", "grapes", "taco", "apple pie",
    ],
  },
  {
    id: "things",
    label: "Things",
    words: [
      "umbrella", "guitar", "toothbrush", "ladder", "bicycle", "camera",
      "scissors", "balloon", "candle", "telescope", "backpack", "kite",
      "headphones", "sunglasses", "alarm clock", "broom", "key", "mirror",
      "pillow", "trophy", "rocket", "anchor", "crown", "envelope", "hammer",
      "lightbulb", "microphone", "parachute", "remote control", "skateboard",
      "tent", "laptop", "magnet", "ceiling fan", "football",
    ],
  },
  {
    id: "actions",
    label: "Actions",
    words: [
      "swimming", "sneezing", "juggling", "dancing", "fishing",
      "brushing teeth", "climbing a ladder", "riding a horse", "sleeping",
      "cooking", "crying", "laughing", "typing", "painting a wall",
      "taking a selfie", "walking a dog", "lifting weights", "skipping rope",
      "washing dishes", "driving", "flying a kite", "surfing", "yawning",
      "boxing", "knitting", "rowing a boat", "blowing bubbles",
      "ironing clothes", "changing a lightbulb", "playing the drums",
      "milking a cow", "sweeping the floor",
    ],
  },
  {
    id: "places",
    label: "Places",
    words: [
      "beach", "airport", "hospital", "library", "zoo", "cinema", "kitchen",
      "desert", "jungle", "castle", "market", "farm", "stadium", "volcano",
      "island", "school", "bank", "restaurant", "swimming pool", "mountain",
      "museum", "bakery", "gym", "train station", "prison", "circus",
      "campsite", "hair salon", "space station", "petrol station", "church",
      "bus stop",
    ],
  },
  {
    id: "jobs",
    label: "Jobs",
    words: [
      "doctor", "firefighter", "chef", "pilot", "teacher", "police officer",
      "farmer", "astronaut", "dentist", "barber", "photographer", "magician",
      "mechanic", "nurse", "plumber", "waiter", "lifeguard", "artist",
      "singer", "carpenter", "scientist", "footballer", "tailor", "DJ",
      "judge", "clown", "security guard", "taxi driver", "news reporter",
      "builder",
    ],
  },
] as const;

export type CategoryId = (typeof wordCategories)[number]["id"];
