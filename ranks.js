const schedule = require('./schedule.js').schedule;
const teams = require('./schedule.js').teams
const resultsJSON = require('./results.json');
const fs = require('fs');

const myArgs = process.argv.slice(2);
const week = parseInt(myArgs[0]) || 7;
const ranks = [];

// fill ranks with team objects
teams.forEach(team => ranks.push({
  team: team,
  wins: 0,
  losses: 0,
  ties: 0,
  pointsFor: 0,
  pointsAgainst: 0,
}))
const teamNameMax = Math.max(...teams.map(team => team.length))
// copy to nascar ranks for separate tracking
const nascarRanks = ranks.map(team => {return {...team}})


// only consider scoring weeks from arguments
const weeks = Object.keys(resultsJSON).filter(week => (Object.values(resultsJSON[week]).reduce((a,b) => a + b)) > 0).slice(0, week);

const updateRanks = (rankObj, points, opponent, week) => {
  let oppPoints = resultsJSON[week][opponent];
  if (points > oppPoints) rankObj.wins += 1;
  if (oppPoints > points) rankObj.losses += 1;
  if (points === oppPoints) rankObj.ties += 1;
  rankObj.pointsFor += points;
  rankObj.pointsAgainst += oppPoints;
};

weeks.forEach(week => {
  teams.forEach(team => {
    let points = resultsJSON[week][team];
    
    let pod = schedule[week].find(pod => pod.includes(team)).filter(x => x !== team);
    let nascarPod = teams.filter(x => x !== team);
    
    let rankObj = ranks.find(rank => rank.team === team);
    let nascarObj = nascarRanks.find(rank => rank.team === team);
    
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
  let bWins = b.wins + 0.5 * b.ties;
  if (aWins === bWins) return a.pointsFor > b.pointsFor ? -1 : 1;
  return aWins > bWins ? -1 : 1;
});

nascarRanks.sort((a, b) => {
  let aWins = a.wins + 0.5 * a.ties;
  let bWins = b.wins + 0.5 * b.ties;
  if (aWins === bWins) return a.pointsFor > b.pointsFor ? -1 : 1;
  return aWins > bWins ? -1 : 1;
});

let txt = '';
ranks.forEach((team, i) => {
  let avPf = Math.round(((team.pointsFor / (3 * weeks.length)) + Number.EPSILON) * 100) / 100;
  let avPa = Math.round(((team.pointsAgainst / (3 * weeks.length)) + Number.EPSILON) * 100) / 100;
  let spaces = teamNameMax - team.team.length;
  let spaceStr = '';
  for (let j = 0; j < spaces; j++) {
    spaceStr = spaceStr + ' ';
  }
  let winStr = '';
  let lossStr = '';
  if (team.wins < 10) winStr += ' ';
  if (team.losses < 10) lossStr += ' ';
  let pfStr = '';
  for (let i = avPf.toString().length; i < 6; i++) {
    pfStr += ' '
  }
  
  txt += `${i + 1}: ${team.team}${spaceStr}${i + 1 < 10 ? ' ' : ''} ${winStr}${team.wins} -${lossStr}${team.losses} - ${team.ties} -- ${avPf}${pfStr} - ${avPa} \n`;
});

let nascarTxt = '';
nascarRanks.forEach((team, i) => {
  let avPf = Math.round(((team.pointsFor / (11 * weeks.length)) + Number.EPSILON) * 100) / 100;
  let avPa = Math.round(((team.pointsAgainst / (11 * weeks.length)) + Number.EPSILON) * 100) / 100;
  let spaces = teamNameMax - team.team.length;
  let spaceStr = '';
  for (let j = 0; j < spaces; j++) {
    spaceStr = spaceStr + ' ';
  }
  let recordStr = ''
  if (team.wins >= 10) recordStr += ' ';
  if (team.losses >= 9) recordStr += ' ';



  nascarTxt += `${i + 1}: ${team.team}${spaceStr}${i + 1 < 10 ? ' ' : ''} ${team.wins < 10 ? ' ' : ''}${team.wins}-${team.losses < 10 ? ' ': ''}${team.losses}-${team.ties} -- ${avPf} - ${avPa} \n`;
});

fs.writeFile(`week${week}.txt`, txt, function (err) {
  if (err) console.log(err);
});

fs.writeFile(`nascarWeek${week}.txt`, nascarTxt, (err) => {
  if (err) console.log(err);
});
