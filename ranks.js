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
const nascarRanks = ranks.map(team => {return {...team}})

const weeks = Object.keys(resultsJSON).filter(week => (Object.values(resultsJSON[week]).reduce((a,b) => a + b)) > 0).slice(0,1);

const updateRanks = (rankObj, points, opponent, week) => {
  let oppPoints = resultsJSON[week][opponent];
  if (points > oppPoints) rankObj.wins += 1;
  if (oppPoints > points) rankObj.losses += 1;
  if (points === oppPoints) rankObj.ties += 1;
  rankObj.pointsFor += points;
  rankObj.pointsAgainst += oppPoints;
}

weeks.forEach(week => {
  teams.forEach(team => {
    let points = resultsJSON[week][team];
    
    let pod = schedule[week].find(pod => pod.includes(team)).filter(x => x !== team);
    let nascarPod = teams.filter(x => x !== team);
    // console.log(nascarPod.length);
    
    let rankObj = ranks.find(rank => rank.team === team);
    let nascarObj = nascarRanks.find(rank => rank.team === team);
    // console.log(nascarObj);
    
    pod.forEach(opponent => {
      updateRanks(rankObj, points, opponent, week);
    });
    
    nascarPod.forEach(opponent => {
      updateRanks(nascarObj, points, opponent, week);
    })
  })
});

ranks.sort((a, b) => {
  let aWins = a.wins + 0.5 * a.ties;
  let bWins = a.wins + 0.5 * b.ties;
  if (aWins === bWins) {
    return a.pointsFor > b.pointsFor ? -1 : 1;
  }
  return aWins > bWins ? -1 : 1;
});

nascarRanks.sort((a, b) => {
  let aWins = a.wins + 0.5 * a.ties;
  let bWins = a.wins + 0.5 * b.ties;
  if (aWins === bWins) {
    return a.pointsFor > b.pointsFor ? -1 : 1;
  }
  return aWins > bWins ? -1 : 1;
});

ranks.forEach((team, i) => {
  console.log(`${i + 1}: ${team.team} ${team.wins}-${team.losses}-${team.ties} -- ${team.pointsFor / (3 * weeks.length)} - ${team.pointsAgainst / (3 * weeks.length)}`);
});

nascarRanks.forEach((team, i) => {
  console.log(`${i + 1}: ${team.team} ${team.wins}-${team.losses}-${team.ties} -- ${team.pointsFor / (3 * weeks.length)} - ${team.pointsAgainst / (3 * weeks.length)}`);
});

// TODO create export ranks
// TODO extract into funtions
