export const determineGrade = (
  level,
  universe,
  marineorpirate,
  island,
  village
) => {
  if (universe === "naruto") {
    if (level > 0 && level < 5) {
      return `Genin ${phraseVillage(village)}`;
    } else if (level >= 5 && level < 10) {
      return `Chûnin ${phraseVillage(village)}`;
    } else if (level >= 10 && level < 30) {
      return `Jônin ${phraseVillage(village)}`;
    } else if (level >= 30 && level < 40) {
      return `Sennin ${phraseVillage(village)}`;
    } else if (level >= 40) {
      return `Kage ${phraseVillage(village)}`;
    }
  } else if (universe === "onepiece") {
    if (level > 0 && level < 5) {
      return marineorpirate === "marine"
        ? `Matelot de ${island} `
        : `Pirate de ${island}`;
    } else if (level >= 5 && level < 10) {
      return marineorpirate === "marine"
        ? `Soldat de ${island}`
        : `Cannonier de ${island}`;
    } else if (level >= 10 && level < 30) {
      return marineorpirate === "marine"
        ? `Colonel de ${island}`
        : `Tireur d'élite de ${island}`;
    } else if (level >= 30 && level < 40) {
      return marineorpirate === "marine"
        ? `Vice-amiral de ${island}`
        : `Bras droit de ${island}`;
    } else if (level >= 40) {
      return marineorpirate === "marine"
        ? `Amiral de ${island}`
        : `Capitaine de ${island}`;
    }
  }
  return "";
};

export const phraseVillage = (village) => {
  if (village == "Son" || village == "Sable") {
    return `du village caché du ${village}`;
  } else {
    return `du village caché de la ${village}`;
  }
};

export const villages = [
  {
    village: "Feuille",
    img: "https://static.wikia.nocookie.net/naruto/images/3/34/Konohagakure.png/revision/latest/scale-to-width-down/350?cb=20160728203645&path-prefix=fr",
  },
  {
    village: "Sable",
    img: "https://static.wikia.nocookie.net/naruto/images/7/79/Suna.png/revision/latest/scale-to-width-down/350?cb=20170809201658&path-prefix=fr",
  },
  {
    village: "Roche",
    img: "https://static.wikia.nocookie.net/naruto/images/d/dd/Iwa.png/revision/latest/scale-to-width-down/350?cb=20160622180556&path-prefix=fr",
  },
  {
    village: "Brume",
    img: "https://static.wikia.nocookie.net/naruto/images/8/82/Kiri.png/revision/latest/scale-to-width-down/350?cb=20170809202403&path-prefix=fr",
  },
  {
    village: "Pluie",
    img: "https://static.wikia.nocookie.net/naruto/images/9/9a/Ame.png/revision/latest/scale-to-width-down/350?cb=20160623200634&path-prefix=fr",
  },
  {
    village: "Son",
    img: "https://static.wikia.nocookie.net/naruto/images/9/9f/Oto.png/revision/latest/scale-to-width-down/350?cb=20200229173853&path-prefix=fr",
  },
];
export const islands = [
  {
    island: "Wa no Kuni",
    img: "https://static.wikia.nocookie.net/onepiece/images/8/87/Pays_des_Wa_Anime_Infobox.png/revision/latest?cb=20190822082838&path-prefix=fr",
  },
  {
    island: "Wholecake Island",
    img: "https://static.wikia.nocookie.net/onepiece/images/0/0a/Whole_Cake_Island_Anime_Infobox.png/revision/latest?cb=20170521125707&path-prefix=fr",
  },
  {
    island: "Log Town",
    img: "https://static.wikia.nocookie.net/onepiece/images/8/87/Loguetown_Anime_Infobox.png/revision/latest?cb=20160723135203&path-prefix=fr",
  },
  {
    island: "Dressrosa",
    img: "https://static.wikia.nocookie.net/onepiece/images/3/36/Acacia_Anime_Infobox.png/revision/latest/scale-to-width-down/1280?cb=20141229001054&path-prefix=fr",
  },
  {
    island: "Sabaody",
    img: "https://static.wikia.nocookie.net/onepiece/images/8/8a/Archipel_des_Sabaody_Anime_Infobox.png/revision/latest?cb=20220125111249&path-prefix=fr",
  },
  {
    island: "Alabasta",
    img: "https://i.servimg.com/u/f38/15/08/91/65/alabas10.jpg",
  },
  {
    island: "Skypiea",
    img: "https://m.media-amazon.com/images/M/MV5BYjM0NmIyNmMtMDU5Zi00OWMyLTg2Y2ItNGU4MDFiYjEyMDE4XkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_.jpg",
  },
  {
    island: "Marineford",
    img: "https://lh5.googleusercontent.com/edDGzsEujxAxNzFuY5tajZDMgXS9s9EnJnYW7JMMOCSH7LUeCOT13Ldsi1Otp4GnpTcjHdhf6ymAkbrM-yiRrVwl6TFOKKk6ttaZ-vCE_DgTIgZcO6xL92OcmaUPXnmv8przl2bRm4tOdJUpuWaAfVL8OZaUtwnM-gRxAKmLuLqPN2AuebactK9GUPnUnA",
  },
  {
    island: "Impel Down",
    img: "https://pm1.aminoapps.com/6875/dde94cf1bc3b3419a55ab1fe4d2be10ca9ee1cf4r1-1630-1000v2_00.jpg",
  },
  {
    island: "Royaume de Goa",
    img: "https://static.wikia.nocookie.net/onepiece/images/7/78/Goa_Anime_Infobox.png/revision/latest?cb=20150228003941&path-prefix=fr",
  },
  {
    island: "Fuschia",
    img: "https://static.wikia.nocookie.net/onepiece/images/d/dd/Village_de_Fushsia_Anime_Infobox.png/revision/latest?cb=20140912163732&path-prefix=fr",
  },
  {
    island: "Marineford",
    img: "https://static.wikia.nocookie.net/onepiece/images/f/fd/Marine_Ford_Anime_Infobox.png/revision/latest?cb=20130424195828&path-prefix=fr",
  },
];
