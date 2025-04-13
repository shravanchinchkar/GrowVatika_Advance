import ExploreSoil from "../public/assets/images/ExploreImages/explore-soil.jpeg";
import ExplorePots from "../public/assets/images/ExploreImages/explore-pots.jpeg";
import ExplorePlants from "../public/assets/images/ExploreImages/explore-plants.png";
import ExploreFertilizers from "../public/assets/images/ExploreImages/explore-fertilizers.png";

export const ExploreMoreSectionData = [
  {
    id: "Plants",
    title: "Plant",
    image: ExplorePlants,
    onHover: ["Indoor Plants", "Outdoor Plants", "Flowering Plants"],
  },
  {
    id: "Soil",
    title: "Soil",
    image: ExploreSoil,
    onHover: ["Potting Mix", "Garden Soil", "Organic Compost"],
  },
  {
    id: "Pots",
    title: "Pots",
    image: ExplorePots,
    onHover: ["Ceramic Pots", "Plastic Pots", "Hanging Pots"],
  },
  {
    id: "Fertilizers",
    title: "Fertilizers",
    image: ExploreFertilizers,
    onHover: ["Organic Fertilizers", "Chemical Fertilizers", "Plant Food"],
  },
];
