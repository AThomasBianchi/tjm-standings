const BUCKS = "Young Bucks";
const COUNTRY = "Country Strong";
const SPARTANS = "West Coast Spartans";
const THUNDER = "Dip City Thunder";
const ZEPHYRS = "Springfield Zephyrs";
const RENEGADES = "Orlando Renegades";
const SHOOTERS = "Bayou Shooters";
const FIRE = "Structure Fire";
const RAIDERS = "The Cheating Raiders"
const JAGS = "Midtown Jaguars";
const TIDE = "Detroit Nittany Tide";
const RYNO = "Ryno World";

const TEAMS = [BUCKS, COUNTRY, SPARTANS, THUNDER, ZEPHYRS, RENEGADES, SHOOTERS, FIRE, RAIDERS, JAGS, TIDE, RYNO];

const SCHEDULE = {
  '1': [
    [BUCKS, JAGS, THUNDER, SHOOTERS,],
    [COUNTRY, RAIDERS, ZEPHYRS, RYNO],
    [RENEGADES, TIDE, SPARTANS, FIRE]
  ],
  '2': [
    [JAGS, FIRE, RYNO, TIDE],
    [COUNTRY, RENEGADES, BUCKS, SHOOTERS],
    [SPARTANS, THUNDER, ZEPHYRS, RAIDERS],
  ],
  '3': [
    [BUCKS, SPARTANS, COUNTRY, TIDE],
    [RAIDERS, SHOOTERS, RYNO, FIRE],
    [RENEGADES, THUNDER, ZEPHYRS, JAGS]
  ],
  '4': [
    [COUNTRY, FIRE, THUNDER, JAGS],
    [RENEGADES, RYNO, BUCKS, RAIDERS],
    [ZEPHYRS, SHOOTERS, SPARTANS, TIDE],
  ],
  '5': [
    [ZEPHYRS, TIDE, RAIDERS, JAGS],
    [RENEGADES, SHOOTERS, COUNTRY, RYNO],
    [BUCKS, SPARTANS, FIRE, THUNDER],
  ],
  '6': [
    [SPARTANS, COUNTRY, RAIDERS, FIRE],
    [RENEGADES, ZEPHYRS, SHOOTERS, JAGS],
    [BUCKS, TIDE, THUNDER, RYNO],
  ],
  '7': [
    [RYNO, SPARTANS, SHOOTERS, JAGS],
    [BUCKS, ZEPHYRS, FIRE, RENEGADES],
    [TIDE, COUNTRY, THUNDER, RAIDERS],
  ],
}

module.exports.schedule = SCHEDULE;
module.exports.teams = TEAMS;