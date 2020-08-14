import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import PlayerForm from "./PlayerForm";
import "./style.css";
function MatchTable(props) {
  const colors = [
    "rgb(255,229,153)",
    "rgb(182,215,168)",
    "rgb(213,166,189)",
    "rgb(159,197,232)",
    "rgb(249,203,156)",
    "rgb(244,204,204)",
    "rgb(180,167,214)",
    "rgb(147,196,125)"
  ];
  const players = props.players;
  debugger;
  const renderHeader = () => {
    debugger;
    return (
      <thead>
        <tr>
          <th class="cabecalho" />
          <th class="cabecalho">Twitch</th>
          <th class="cabecalho">Chess.com</th>
          <th class="cabecalho">Rating</th>
          <th class="cabecalho">Group Final</th>
          <th class="cabecalho">Quartas</th>
          <th class="cabecalho">Semi</th>
          <th class="cabecalho">Final</th>
          <th class="cabecalho">Campeão</th>
        </tr>
      </thead>
    );
  };
  const renderFase = (players, row_idx, fase_idx) => {
    const color_idx = Math.floor(row_idx / 4);
    const row_style = {
      background: colors[color_idx]
    };
    if (fase_idx == 1) {
      //tabela inicial
      const player = players[fase_idx - 1][row_idx];
      return (
        <>
          <td class="conteudo" style={{ ...row_style }}>
            {row_idx + 1}
          </td>
          <td class="conteudo" style={{ ...row_style }}>
            {player["twitch"]}
          </td>
          <td class="conteudo" style={{ ...row_style }}>
            {player["chess"]}
          </td>
          <td class="conteudo" style={{ ...row_style }}>
            {player["rating"]}
          </td>
        </>
      );
    }
    
      const N = 2 ** (fase_idx - 1);
      let player = 
      {
        twitch: "",
        chess: "",
        rating: 0
      };
      const new_row_idx = Math.floor(row_idx / N);
      try {
        player = players[fase_idx - 1][new_row_idx];
      } catch(e) {

      }
      if (fase_idx>1) {
        if (row_idx % N == 0) {
          return (
            <td rowSpan={N} class="conteudo" style={{ ...row_style }}>
              {player?player['chess']:'fase_idx='+fase_idx+',new_row_idx='+new_row_idx}
            </td>
          );
        }
      }
  };
  const renderRows = players => {
    debugger;
    return (
      <tbody>
        {players[0].map((player, idx) => {
          const fases = [1, 2, 3, 4, 5, 6];
          return (
            <tr>
              <>
                {fases.map(fase_idx => {
                  return renderFase(players, idx, fase_idx);
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
      {renderHeader()}
      {renderRows(players)}
    </table>
  );
}
function App() {
  const dummy_data1 = [
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
  const dummy_data2 = [{
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
      }];
  const dummy_data3 = [{
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
      },{
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
      }];
  const dummy_data4 = [{
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
      }];

  const dummy_data5 = [{
        twitch: "a",
        chess: "Winner 4/1",
        rating: 2506
      },
      {
        twitch: "b",
        chess: "Winner 4/2",
        rating: 2506
      }];

  const dummy_data6 = [{
        twitch: "a",
        chess: "Winner 5/1",
        rating: 2506
      }];
  const [players, setPlayers] = React.useState([dummy_data1, dummy_data2, dummy_data3, dummy_data4, dummy_data5, dummy_data6]);
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
        debugger;
        if (a["rating"] > b["rating"]) {
          return 1;
        } else if (a["rating"] < b["rating"]) {
          return -1;
        }
        return 0;
      })
      .reverse();
    setPlayers(new_players);
  };
  return (
    <>
      <MatchTable players={players} />
      <PlayerForm onSubmit={handleSubmit} />
    </>
  );
}

render(<App />, document.getElementById("root"));
