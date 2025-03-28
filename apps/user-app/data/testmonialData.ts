
interface TestmonialDataType{
  id:string
    image:string,
    testmonialName:string,
    testmonialDesignation:string,
    testmonialCountry:string,
    testmonialOpinion:string,
    testmonialRating:string
}

export const TestmonialData:TestmonialDataType[] = [
  {
    id:"1",
    image: "/assets/images/TestimonialImages/TestmonialImageOne.jpg",
    testmonialName: "Sophia Williams",
    testmonialDesignation: "Landscape Architect",
    testmonialCountry: "United States",
    testmonialOpinion:
      "GrowVatika is a game-changer for plant enthusiasts like me. The website is user-friendly, and the variety of plants is outstanding. The quality of the plants I ordered exceeded my expectations. Highly recommended!",
    testmonialRating: "5",
  },
  {
    id:"2",
    image: "/assets/images/TestimonialImages/TestmonialImageTwo.jpeg",
    testmonialName: "michelle anderson",
    testmonialDesignation: "housewife",
    testmonialCountry: "United States",
    testmonialOpinion:
      "Step into a world of lush greenery with GrowVatika! From vibrant plants and stylish planters to essential gardening tools and nutrient-rich soil, find everything you need to create your perfect ease!",
    testmonialRating: "5",
  },
  {
    id:"3",
    image: "/assets/images/TestimonialImages/TestmonialImageThree.jpg",
    testmonialName: "Arjun Mehra",
    testmonialDesignation: "Botany Professor",
    testmonialCountry: "India",
    testmonialOpinion:
      "As a botany expert, I am thoroughly impressed by GrowVatika's selection of rare and exotic plants. Their packaging ensures that the plants arrive in perfect condition. It’s a one-stop shop for all my gardening needs!",
    testmonialRating: "4.5",
  },
];
