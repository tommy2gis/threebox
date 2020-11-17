export const DEFAULT_DARK_THEME = {
    backgroundStyle: {
      fill: 'rgba(0,0,0,0)',
    },
    defaultColor: '#5B8FF9',
    width: 400,
    height: 400,
    padding: 'auto',
    title: {
      padding: [24, 24, 24, 24],
      fontFamily: 'PingFang SC',
      fontSize: 18,
      fontWeight: 'bold',
      fill: 'rgba(255,255,255,0.95)',
      stroke: 'rgba(0,0,0,0.95)',
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 20,
      alignWithAxis: false,
    },
    description: {
      fontFamily: 'PingFang SC',
      fontSize: 12,
      fill: 'rgba(255, 255, 255, 0.95)',
      stroke: 'rgba(0,0,0,0.95)',
      textAlign: 'left',
      textBaseline: 'top',
      lineHeight: 16,
      alignWithAxis: false,
    },
    axis: {
      y: {
        visible: true,
        position: 'left',
        autoRotateTitle: true,
        grid: {
          visible: true,
          line: {
            style: {
              stroke: 'rgba(255, 255, 255, 0.15)',
              lineWidth: 1,
              lineDash: null,
            },
          },
        },
        line: {
          visible: false,
          style: {
            stroke: 'rgba(255, 255, 255, 0.45)',
            lineWidth: 1,
          },
        },
        tickLine: {
          visible: false,
          style: {
            stroke: 'rgba(255, 255, 255, 0.45)',
            lineWidth: 0.5,
            length: 4,
          },
        },
        label: {
          visible: true,
          offset: 8,
          autoRotate: false,
          autoHide: true,
          textStyle: {
            fill: 'rgba(255, 255, 255, 0.95)',
            fontSize: 12,
          },
        },
        title: {
          visible: false,
          spacing: 12,
          style: {
            fill: 'rgba(255, 255, 255, 0.95)',
            fontSize: 12,
            textBaseline: 'bottom',
          },
        },
      },
      x: {
        visible: true,
        position: 'bottom',
        autoRotateTitle: false,
        grid: {
          visible: false,
          line: {
            style: {
              stroke: 'rgba(255, 255, 255, 0.65)',
              lineWidth: 1,
              lineDash: null,
            },
          },
        },
        line: {
          visible: false,
          style: {
            stroke: 'rgba(255, 255, 255, 0.45)',
          },
        },
        tickLine: {
          visible: true,
          style: {
            length: 4,
            stroke: 'rgba(255, 255, 255, 0.45)',
            lineWidth: 0.5,
          },
        },
        label: {
          visible: true,
          textStyle: {
            fill: 'rgba(255, 255, 255, 0.95)',
            fontSize: 12,
          },
          offset: 16,
          autoHide: true,
          autoRotate: true,
        },
        title: {
          visible: false,
          spacing: 12,
          style: {
            fill: 'rgba(255, 255, 255, 0.95)',
            fontSize: 12,
          },
        },
      },
      circle: {
        autoRotateTitle: true,
        // gridType: 'line',
        grid: {
          style: {
            lineDash: null,
            lineWidth: 1,
            stroke: '#E3E8EC',
          },
        },
        line: {
          style: {
            lineWidth: 1,
            stroke: '#BFBFBF',
          },
        },
        tickLine: {
          style: {
            lineWidth: 1,
            stroke: '#bdc8d3',
            length: 4,
            alignWithLabel: true,
          },
        },
        label: {
          offset: 16,
          textStyle: {
            fill: '#a0a4aa',
            fontSize: 12,
          },
          autoRotate: true,
          autoHide: true,
        },
        title: {
          offset: 12,
          style: { fill: '#767b84', fontSize: 12 },
        },
      },
      radius: {
        label: {
          offset: 12,
          textStyle: {
            fill: '#a0a4aa',
            fontSize: 12,
          },
        },
      },
    },
    legend: {
      flipPage: false,
      position: 'bottom',
      // 距离panelRange的距离
      innerPadding: [16, 16, 16, 16],
      title: {
        visible: false,
        style: {
          fill: '#bdc8d3',
        },
      },
      text: {
        style: {
          fill: '#bdc8d3',
        },
      },
    },
    label: {
      offset: 12,
      textStyle: {
        fill: 'rgba(255, 255, 255, 0.95)',
      },
      style: {
        fill: 'rgba(255, 255, 255, 0.95)',
        lineWidth: 1,
      },
    },
    components: {
      tooltip: {
        domStyles: {
          'g2-tooltip': {
            backgroundColor: 'rgba(33,33,33, 0.95)',
            boxShadow: '0px 0px 8px rgba(0,0,0,0.95)',
            color: 'rgba(255, 255, 255, 0.95)',
          },
        },
      },
    },
  };