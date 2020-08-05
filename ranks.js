const schedule = require('./schedule.js').schedule;
const teams = require('./schedule.js').teams
const resultsJSON = require('./results.json');

const ranks = [];
teams.forEach(team => ranks.push({
  team: team,
  wins: 0,
  losses: 0,
  ties: 0,
  pointsFor: 0,
  pointsAgainst: 0,
}))
console.log(ranks);

let weeks = Object.keys(resultsJSON).filter(week => (Object.values(resultsJSON[week]).reduce((a,b) => a + b)) > 0);

weeks.forEach(week => {
  teams.forEach(team => {
    let points = resultsJSON[week][team];
    let pod = schedule[week].find(pod => pod.includes(team)).filter(x => x !== team);
    console.log(week, team, points);
    console.log(pod);
    pod.forEach(opponent => {
      let oppPoints = resultsJSON[week][opponent];
      let teamObj = team.find()
      // TODO update OBJECT
      // if (points > oppPoints) ranks[team].wins = ranks[team].wins + 1;
      // if (oppPoints > points) ranks[team].losses = ranks[team].losses + 1;
      // if (points === oppPoints) ranks[team].ties = ranks[team].ties + 1;
      // ranks[team].pointsFor = ranks[team].pointsFor + points;
      // ranks[team].pointsAgainst = ranks[team].pointsAgainst + oppPoints;
    })
  })
});

console.log(ranks);
