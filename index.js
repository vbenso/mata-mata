import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import PlayerForm from "./PlayerForm";
import "./style.css";
import NextIcon from "@material-ui/icons/CheckCircleOutline";
import ChevronRightIcon from '@material-ui/icons/PlayArrow';

const colors = [
  "rgb(255,229,153)",
  "rgb(182,215,168)",
  "rgb(213,166,189)",
  "rgb(159,197,232)",
  "rgb(249,203,156)",
  "rgb(244,204,204)",
  "rgb(180,167,214)",
  "rgb(147,196,125)",
  "rgb(255,229,153)",
  "rgb(182,215,168)",
  "rgb(213,166,189)",
  "rgb(159,197,232)",
  "rgb(249,203,156)",
  "rgb(244,204,204)",
  "rgb(180,167,214)",
  "rgb(147,196,125)",
  "rgb(255,229,153)",
  "rgb(182,215,168)",
  "rgb(213,166,189)",
  "rgb(159,197,232)",
  "rgb(249,203,156)",
  "rgb(244,204,204)",
  "rgb(180,167,214)",
  "rgb(147,196,125)",
  "rgb(255,229,153)",
  "rgb(182,215,168)",
  "rgb(213,166,189)",
  "rgb(159,197,232)",
  "rgb(249,203,156)",
  "rgb(244,204,204)",
  "rgb(180,167,214)",
  "rgb(147,196,125)"
];

function FormatTime(props) {
  const secs = ''+Math.ceil(props.sec%60);
  return Math.floor(props.sec/60)+":"+(secs.length>1?secs:'0'+secs);
}

function MatchTable(props) {
  const players = props.players;
  const advance = props.advance;
  const renderHeader = players => {
    const L = Math.ceil(Math.log2(players[0].length));
    return (
      <thead>
        <tr>
          <th class="cabecalho" />
          <th class="cabecalho">Twitch</th>
          <th  colSpan="2" class="cabecalho">Chess.com</th>
          {L > 5 ? <th colSpan="2" class="cabecalho">Group Final</th> : null}
          {L > 4 ? <th colSpan="2" class="cabecalho">Oitavas</th> : null}
          {L > 3 ? <th colSpan="2" class="cabecalho">Quartas</th> : null}
          {L > 2 ? <th colSpan="2" class="cabecalho">Semi</th> : null}
          {L > 1 ? <th colSpan="2" class="cabecalho">Final</th> : null}
          {L > 0 ? <th class="cabecalho">Campeão</th> : null}
        </tr>
      </thead>
    );
  };
  const renderFase = (players, row_idx, fase_idx) => {
    const L = Math.ceil(Math.log2(players[0].length));
    if (fase_idx == 1) {
      //tabela inicial
      let player;
      try {
        player = players[fase_idx - 1][row_idx];
      } catch (e) {}
      if (!player) {
        player = {
          twitch: "",
          chess: "",
          rating: 0,
          row_style: {
            background: "rgb(255,255,255)"
          }
        };
      }

      const row_style = player["row_style"]
        ? player["row_style"]
        : { background: "rgb(255,255,255)" };
      return (
        <>
          <td style={{ ...row_style }}>
            {row_idx + 1}
          </td>
          <td style={{ ...row_style }}>
            {player["twitch"]}
          </td>
          
          <td style={{ ...row_style }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1 }}>
                  <div>
                  <>
                    {player["chess"]}
                    <br/> 
                    {'('+player["rating"]+')'}
                  </>
                  </div>
                </div>
              <NextIcon
                onClick={() => {
                  advance(row_idx, fase_idx - 1);
                }}
              />
            </div>
          </td>
          {row_idx%2==0?(
            <td rowSpan="2" style={{borderLeft: '3px solid black', borderRight: '3px solid black',backgroundColor:'lightgrey'}}>
              <ChevronRightIcon style={{backgroundColor:'lightgrey'}}/>
            </td>
            ):null}
        </>
      );
    } else {
      const N = 2 ** (fase_idx - 1);
      const new_row_idx = Math.floor(row_idx / N);
      let player = undefined;
      let row_style = { background: "rgb(255,255,255)" };
      try {
        player = players[fase_idx - 1][new_row_idx];
      } catch (e) {}
      if (player) {
        row_style = player["row_style"];
      }
    
      if (row_idx % N == 0) {
        row_style = {
              ...row_style, 
              borderRight: '3px solid black'
              };
        if(row_idx%(N*2)!=0)
            row_style = {
              ...row_style, 
              borderBottom: '3px solid black'
              };
        if (player) {
          let adjusted_time = 180;
          let opponent;
          let content;
          const adjust_time = (me, opponent, secs) => {
            if(me['rating']>opponent['rating']) {
              secs = secs - (me['rating']-opponent['rating'])/150*30;
            }
            return secs;
          }
          if(new_row_idx%2==0) { 
            opponent = players[fase_idx-1][new_row_idx+1];
            if(opponent)
              adjusted_time = adjust_time(player, opponent, adjusted_time);
            content = <>
              {player["chess"]}
              <br/> 
              {'('+player["rating"]+') '}
              <FormatTime sec={adjusted_time}/>
              <br/>
              {opponent?opponent['chess']:''}
            </>;
          } else {
            opponent = players[fase_idx-1][new_row_idx-1];
            if(opponent)
              adjusted_time = adjust_time(player, opponent, adjusted_time);
            content = <>
              {opponent?opponent['chess']:''}
              <br/>
              {'('+player["rating"]+') '}
                            <FormatTime sec={adjusted_time}/>
              <br/> 
              {player["chess"]}
            </>;
          }
          return (
            <>
            <td rowSpan={N} style={{ ...row_style }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1 }}>
                  <div>
                  {content}
                  </div>
                </div>
                <NextIcon
                  onClick={() => {
                    advance(new_row_idx, fase_idx - 1);
                  }}
                />
              </div>
            </td>
            {new_row_idx%2==0 && fase_idx<=L?(
              <td rowSpan={N*2} style={{borderBottom: '3px solid black', borderLeft: '3px solid black', borderRight: '3px solid black', backgroundColor:'lightgrey'}}>
              <ChevronRightIcon style={{backgroundColor:'lightgrey'}}/>
              </td>
            ):null}
            </>
          );
        } else {
          return (
            <td colSpan="2"/>
          );
        }
      }
    }
  };
  const renderRows = players => {
    const n_fases = Math.ceil(Math.log2(players[0].length));
    const n_slots = 2 ** n_fases;
    let idx_vector = [];
    for (let i = 0; i < n_slots; i++) {
      idx_vector.push(i);
    }
    return (
      <tbody>
        {idx_vector.map(player_idx => {
          let fases = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          fases = fases.filter(val => {
            return val - 1 <= n_fases;
          });
          return (
            <tr>
              <>
                {fases.map(fase_idx => {
                  return renderFase(players, player_idx, fase_idx);
                })}
              </>
            </tr>
          );
        })}
      </tbody>
    );
  };
  debugger;
  return (
    <table>
      {renderHeader(players)}
      {renderRows(players)}
    </table>
  );
}
function App() {
  let dummy_data1 = [
    {
      twitch: "gaabroo92",
      chess: "BrazilianSwag",
      rating: 2506
    },
    {
      twitch: "wranho",
      chess: "WesleyRanho",
      rating: 2253
    },
    {
      twitch: "PatrickLittig",
      chess: "PatrickLittig",
      rating: 2156
    },
    {
      twitch: "ixandy",
      chess: "giovani_cwb",
      rating: 2050
    },
    {
      twitch: "antunesperoza",
      chess: "antunesperoza",
      rating: 2030
    },
    {
      twitch: "dlborger",
      chess: "davalb",
      rating: 1830
    },
    {
      twitch: "Matheus0Henrique",
      chess: "Matheus-Henrique",
      rating: 1778
    },
    {
      twitch: "ca1valoo",
      chess: "glebsonrafael",
      rating: 1680
    },
    {
      twitch: "inaciodavies",
      chess: "inaciodavies",
      rating: 1643
    },
    {
      twitch: "joaoftb0",
      chess: "JoaoFTB",
      rating: 1626
    },
    {
      twitch: "rod7lima",
      chess: "rod_lima",
      rating: 1550
    },
    {
      twitch: "metaleiro_dota2",
      chess: "diegolamarao",
      rating: 1533
    },
    {
      twitch: "jonastrindade82",
      chess: "jonastrindade",
      rating: 1506
    },
    {
      twitch: "Lavoisier_Oliveira",
      chess: "Lavoisier_Oliveira",
      rating: 1498
    },
    {
      twitch: "surfistapratiado22",
      chess: "surfistapratiado",
      rating: 1427
    },
    {
      twitch: "splector1227",
      chess: "gabriel122762",
      rating: 1423
    },
    {
      twitch: "andrefalca0",
      chess: "Andre_Falcao",
      rating: 1407
    },
    {
      twitch: "pedrop_sm",
      chess: "ChessPedroP",
      rating: 1385
    },
    {
      twitch: "elissama_camargo",
      chess: "ElissamaCamargo",
      rating: 1335
    },
    {
      twitch: "FritzMatador",
      chess: "Fritz-Brazuca",
      rating: 1310
    },
    {
      twitch: "sandymio1",
      chess: "SandyYolainny",
      rating: 1299
    },
    {
      twitch: "carlosalexandre2038",
      chess: "carlosalexandre_2038",
      rating: 1219
    },
    {
      twitch: "Uchichaz",
      chess: "Alex_V_Chess",
      rating: 1216
    },
    {
      twitch: "Isaaczin2008",
      chess: "isaaczin",
      rating: 1200
    },
    {
      twitch: "Miguelmds14",
      chess: "Zigaruu",
      rating: 1020
    },
    {
      twitch: "rafafeitosa123456789",
      chess: "rafaelpereira720",
      rating: 985
    },
    {
      twitch: "davibbp007",
      chess: "davibbp",
      rating: 940
    },
    {
      twitch: "RafaelCarreiro79",
      chess: "rafaelcarreiro79",
      rating: 910
    },
    {
      twitch: "jo40luc4s",
      chess: "JhonLucas",
      rating: 903
    },
    {
      twitch: "jordano_MY",
      chess: "JordanoFK",
      rating: 901
    },
    {
      twitch: "guiguivieiraf",
      chess: "guilherme0488",
      rating: 511
    },
    {
      twitch: "tiohdogomes",
      chess: "tioh404",
      rating: 265
    }
  ];
  dummy_data1 = dummy_data1.filter((val, idx) => {
    return idx < 27;
  });
  const dummy_data2 = [
    {
      twitch: "a",
      chess: "Winner 1/1",
      rating: 2506
    },
    {
      twitch: "b",
      chess: "Winner 1/2",
      rating: 2506
    },
    {
      twitch: "c",
      chess: "Winner 1/3",
      rating: 2506
    },
    {
      twitch: "d",
      chess: "Winner 1/4",
      rating: 2506
    }
  ];
  const dummy_data3 = [
    {
      twitch: "a",
      chess: "Winner 2/1",
      rating: 2506
    },
    {
      twitch: "b",
      chess: "Winner 2/2",
      rating: 2506
    },
    {
      twitch: "c",
      chess: "Winner 2/3",
      rating: 2506
    },
    {
      twitch: "d",
      chess: "Winner 2/4",
      rating: 2506
    },
    {
      twitch: "a",
      chess: "Winner 2/5",
      rating: 2506
    },
    {
      twitch: "b",
      chess: "Winner 2/6",
      rating: 2506
    },
    {
      twitch: "c",
      chess: "Winner 2/7",
      rating: 2506
    },
    {
      twitch: "d",
      chess: "Winner 2/8",
      rating: 2506
    }
  ];
  const dummy_data4 = [
    {
      twitch: "a",
      chess: "Winner 3/1",
      rating: 2506
    },
    {
      twitch: "b",
      chess: "Winner 3/2",
      rating: 2506
    },
    {
      twitch: "c",
      chess: "Winner 3/3",
      rating: 2506
    },
    {
      twitch: "d",
      chess: "Winner 3/4",
      rating: 2506
    }
  ];

  const dummy_data5 = [
    {
      twitch: "a",
      chess: "Winner 4/1",
      rating: 2506
    },
    {
      twitch: "b",
      chess: "Winner 4/2",
      rating: 2506
    }
  ];

  const dummy_data6 = [
    {
      twitch: "a",
      chess: "Winner 5/1",
      rating: 2506
    }
  ];

  let new_players = [dummy_data1];

    new_players[0] = new_players[0].map((player, row_idx) => {
      const color_idx = Math.floor(row_idx / 2);
      const row_style = {
        background: colors[color_idx]
      };
      return {
        ...player,
        row_style: row_style
      };
    });
    

  const [players, setPlayers] = React.useState(new_players);
  const handleSubmit = (twitch, chess, rating, chessProfile, chessStats) => {
    debugger;
    let new_players = [...players];
    new_players[0].push({
      twitch: twitch,
      chess: chess,
      rating: rating,
      chessProfile: chessProfile,
      chessStats: chessStats
    });
    new_players[0] = new_players[0]
      .sort((a, b) => {
        if (a["rating"] > b["rating"]) {
          return 1;
        } else if (a["rating"] < b["rating"]) {
          return -1;
        }
        return 0;
      })
      .reverse();

    new_players[0] = new_players[0].map((player, row_idx) => {
      const color_idx = Math.floor(row_idx / 2);
      const row_style = {
        background: colors[color_idx]
      };
      return {
        ...player,
        row_style: row_style
      };
    });
    setPlayers(new_players);
  };
  const handleAdvanceClick = (row_idx, fase_idx) => {
    debugger;
    let new_players = [...players];
    const next_row_idx = Math.floor(row_idx / 2);
    if (!new_players[fase_idx + 1]) {
      new_players[fase_idx + 1] = [];
    }
    new_players[fase_idx + 1][next_row_idx] = players[fase_idx][row_idx];
    setPlayers(new_players);
  };
  return (
    <>
      <MatchTable players={players} advance={handleAdvanceClick} />
      <PlayerForm onSubmit={handleSubmit} />
    </>
  );
}

render(<App />, document.getElementById("root"));
