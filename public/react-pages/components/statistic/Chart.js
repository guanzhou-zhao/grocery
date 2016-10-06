import React from 'react'
import request from 'superagent'
import { VictoryLine, VictoryAxis, VictoryChart, VictoryLabel } from 'victory'
import _ from 'lodash'

var Chart = React.createClass({
  render () {
    const styles = this.getStyles();
    const {prices} = this.props
    return (
      <svg
        style={styles.parent}
        viewBox="0 0 450 350"
      >
        <rect
          x="0" y="0"
          width="450" height="350"
          fill="#ccdee8"
        />

        <rect
          x="0"
          y="0"
          width="10"
          height="30"
          fill="#f01616"
        />

        <rect
          x="420"
          y="10"
          width="20"
          height="20"
          fill="#458ca8"
        />

        <VictoryLabel
          x={430} y={25}
          textAnchor="middle"
          verticalAnchor="end"
          style={styles.labelNumber}
        >
          {"1"}
        </VictoryLabel>

        <VictoryLabel
          x={25} y={15}
          textAnchor="start"
          verticalAnchor="start"
          lineHeight={1.2}
          style={{
            fill: "#000000",
            fontFamily: "inherit",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {"An outlook"}
        </VictoryLabel>

        <VictoryLabel
          x={25} y={70}
          verticalAnchor="end"
          lineHeight={1.2}
          style={styles.labelOne}
        >
          {"Price \n $ NZD"}
        </VictoryLabel>

        <g transform={"translate(0, 40)"}>

          <VictoryAxis dependent
            domain={[0, 10]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styles.axisOne}
            tickFormat={
              (x) => { return Math.abs(x).toString(); }
            }
          />

          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears}
            tickValues={prices.map((p) => {
              return (new Date(p.start_at).getMonth()+1 + '-' + new Date(p.start_at).getDate())
            })
          }
          />

          <VictoryLine
            data={prices}
            domain={{
              x: [new Date(2016, 8, 27), new Date(2016, 9, 10)],
              y: [0, 10]
            }}
            x={'start_at'}
            y={'price'}
            interpolation="monotoneX"
            scale={{x: "time", y: "linear"}}
            standalone={false}
            style={styles.lineOne}
          />
        </g>
      </svg>
    )
  },
  getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";

    return {
      parent: {
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        width: "100%",
        height: "auto"
      },
      labelNumber: {
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },
      axisYears: {
        axis: {
          stroke: "black",
          strokeWidth: 1
        },
        ticks: {
          size: (tick) => {
            const tickSize =
              new Date(tick.start_at).getFullYear() % 2 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
          strokeWidth: 2
        },
        axis: {
          stroke: BLUE_COLOR,
          strokeWidth: 0
        },
        ticks: {
          strokeWidth: 0
        },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: {
          stroke: BLUE_COLOR,
          strokeWidth: 4.5
        }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21
      },
      // DATA SET TWO
      axisTwo: {
        axis: {
          stroke: RED_COLOR,
          strokeWidth: 0
        },
        ticks: {
          strokeWidth: 0
        },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelTwo: {
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineTwo: {
        data: {
          stroke: RED_COLOR,
          strokeWidth: 4.5
        }
      },
      // HORIZONTAL LINE
      lineThree: {
        data: {
          stroke: "#e95f46",
          strokeWidth: 2
        }
      }
    };
  },
  getDataSetOne() {
    return [
      {x: new Date(2000, 1, 1), y: 12},
      {x: new Date(2000, 6, 1), y: 10},
      {x: new Date(2000, 12, 1), y: 11},
      {x: new Date(2001, 1, 1), y: 5},
      {x: new Date(2002, 1, 1), y: 4},
      {x: new Date(2003, 1, 1), y: 6},
      {x: new Date(2004, 1, 1), y: 5},
      {x: new Date(2005, 1, 1), y: 7},
      {x: new Date(2006, 1, 1), y: 8},
      {x: new Date(2007, 1, 1), y: 9},
      {x: new Date(2008, 1, 1), y: -8.5},
      {x: new Date(2009, 1, 1), y: -9},
      {x: new Date(2010, 1, 1), y: 5},
      {x: new Date(2013, 1, 1), y: 1},
      {x: new Date(2014, 1, 1), y: 2},
      {x: new Date(2015, 1, 1), y: -5}
    ];
  },

  getDataSetTwo() {
    return [
      {x: new Date(2000, 1, 1), y: 5},
      {x: new Date(2003, 1, 1), y: 6},
      {x: new Date(2004, 1, 1), y: 4},
      {x: new Date(2005, 1, 1), y: 10},
      {x: new Date(2006, 1, 1), y: 12},
      {x: new Date(2007, 2, 1), y: 48},
      {x: new Date(2008, 1, 1), y: 19},
      {x: new Date(2009, 1, 1), y: 31},
      {x: new Date(2011, 1, 1), y: 49},
      {x: new Date(2014, 1, 1), y: 40},
      {x: new Date(2015, 1, 1), y: 21}
    ];
  }
})
export default Chart
