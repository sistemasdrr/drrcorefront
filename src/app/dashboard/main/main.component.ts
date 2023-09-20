import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStates,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  colors: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  states: ApexStates;
  fill: ApexFill;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public smallBarChart!: Partial<ChartOptions>;
  public smallAreaChart!: Partial<ChartOptions>;
  public smallColumnChart!: Partial<ChartOptions>;
  public smallLineChart!: Partial<ChartOptions>;


  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55,
  ];

  breadscrums = [
    {
      title: 'Dashboad',
      items: ['Home'],
      active: 'Dashboard',
    },
  ];
  constructor() {
  }

  ngOnInit() {
    this.cardChart1();
    this.cardChart2();
    this.cardChart3();
    this.cardChart4();
    this.chart1();
    this.chart2();
  }
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#00E396'],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'New Clients',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Old Clients',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FC8380', '#6973C6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Project 1',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Project 2',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Project 3',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Project 4',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        foreColor: '#9aa0ac',
      },
      colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
        labels: {
          formatter: function (val: string) {
            return val + 'K';
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        y: {
          formatter: function (val: number) {
            return val + 'K';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }
}
