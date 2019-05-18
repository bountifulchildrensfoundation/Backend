exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("stories")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("stories").insert([
        {
          user_id: 1,
          title: "A Moment in Peru",
          country: "Peru",
          description: "A cool story that happened in Peru",
          fullStory:
            "Peru is a country in South America that's home to a section of Amazon rainforest and Machu Picchu, an ancient Incan city high in the Andes mountains. The region around Machu Picchu, including the Sacred Valley, Inca Trail and colonial city of Cusco, is rich in archaeological sites.",
          date: "May 17, 2019"
        },
        {
          user_id: 1,
          title: "A Tour in Ghana",
          country: "Ghana",
          description: "A cool story that happened in Ghana",
          fullStory:
            "Ghana, officially the Republic of Ghana, is a country located along the Gulf of Guinea and Atlantic Ocean, in the subregion of West Africa.",
          date: "May 17, 2019"
        },
        {
          user_id: 1,
          title: "A Day in Cambodia",
          country: "Cambodia",
          description: "A cool story that happened in Cambodia",
          fullStory:
            "Cambodia is a Southeast Asian nation whose landscape spans low-lying plains, the Mekong Delta, mountains and Gulf of Thailand coastline. Phnom Penh, its capital, is home to the art deco Central Market, glittering Royal Palace and the National Museum's historical and archaeological exhibits.",
          date: "May 17, 2019"
        },
        {
          user_id: 2,
          title: "A Life in Haiti",
          country: "Haiti",
          description: "A cool story that happened in Haiti",
          fullStory:
            "Haiti is a Caribbean country that shares the island of Hispaniola with the Dominican Republic to its east. Though it’s still recovering from a 2010 earthquake, many of Haiti's landmarks dating to the early 19th century remain intact. These include Citadelle la Ferrière, a mountaintop fortress, and the nearby ruins of Sans-Souci Palace, the baroque former royal home of King Henry I.",
          date: "May 17, 2019"
        },
        {
          user_id: 2,
          title: "A Moment in Mongolia",
          country: "Mongolia",
          description: "A cool story that happened in Mongolia",
          fullStory:
            "Mongolia, a nation bordered by China and Russia, is known for vast, rugged expanses and nomadic culture. Its capital, Ulaanbaatar, centers around Chinggis Khaan (Genghis Khan) Square, named for the notorious founder of the 13th- and 14th-century Mongol Empire. Also in Ulaanbaatar are the National Museum of Mongolia, displaying historic and ethnographic artifacts, and the restored 1830 Gandantegchinlen Monastery.",
          date: "May 17, 2019"
        },
        {
          user_id: 2,
          title: "A Evening in Paraguay",
          country: "Paraguay",
          description: "A cool story that happened in Paraguay",
          fullStory:
            "Paraguay is a landlocked country between Argentina, Brazil and Bolivia, home to large swaths of swampland, subtropical forest and chaco, wildernesses comprising savanna and scrubland. The capital, Asunción, on the banks of the Paraguay River, is home to the grand Government Palace and the Museo del Barro, displaying pre-Columbian ceramics and ñandutí lacework, the latter available in many shops.",
          date: "May 17, 2019"
        }
      ]);
    });
};
