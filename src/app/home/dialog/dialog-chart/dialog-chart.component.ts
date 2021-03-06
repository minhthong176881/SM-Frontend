import { Component, OnInit, Inject } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerLogResponse, ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styleUrls: ['./dialog-chart.component.css'],
})

export class DialogChartComponent implements OnInit {
  private chart: am4charts.XYChart;
  log: Array<any>;
  id: string;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  month: string;
  options = 'ALL';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private serverService: ServerService) {
    this.log = data.logs;
    this.id = data.id;
  }

  ngOnInit(): void {
    this.drawChart();
  }

  drawChart() {
    if (this.log.length == 0) {
      document.getElementById('chartdiv')!.hidden = true;
      return;
    }
    document.getElementById('chartdiv')!.hidden = false;
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    let title = chart.titles.create();
    title.text = 'Log detail';

    let data = this.preprocessData(this.log);

    chart.data = data;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // categoryAxis.title.text = 'Time';
    // categoryAxis.dataFields.category = "time";
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.axisFills.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = true;
    let valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueYAxis.title.text = 'Status';
    valueYAxis.renderer.minWidth = 20;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "status";

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.tooltipText = "Time: {time} \n Status: {realStatus}";
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  getLog(date: string, month: string) {
    const range = this.getRange(this.range);
    let start = '';
    let end = '';
    let dateStr = '';
    let monthStr = '';
    switch (this.options) {
      case 'ALL':
        break;
      case 'DATE':
        dateStr = this.formatDate(date);
        break;
      case 'MONTH':
        this.setMonth(month);
        monthStr = this.month
        break;
      case 'RANGE':
        start = range[0] != 'null' ? range[0] : '';
        end = range[1] != 'null' ? range[1] : '';
        break;
    }

    this.serverService.log(this.id, start, end, dateStr, monthStr).subscribe((result: ServerLogResponse) => {
      this.log = result.logs;
      if (this.chart) {
        this.chart.dispose();
      }
      this.drawChart();
    })
  }

  getRange(range: any) {
    const start = JSON.stringify(range.value.start)
    const end = JSON.stringify(range.value.end)
    return [this.formatDateRange(start), this.formatDateRange(end)]
  }

  setMonth(date: string) {
    const newDate = new Date(date).toLocaleString("en-US")
    let el = newDate.split(',');
    let el2 = el[0].split('/');
    if (parseInt(el2[0]) < 10) el2[0] = '0' + el2[0];
    this.month = el2[2] + "-" + el2[0];
  }

  preprocessData(data: any) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let unixDate = item.time;
      let date = new Date(unixDate * 1000);
      let time = new Date(unixDate * 1000).toLocaleString("en-US");
      // let el = date.split("/");
      // let dateString = el[2] + "-" + el[0] + "-" + el[1];
      result.push({
        time: time,
        status: item.status == 'On' ? 1 : 0,
        realStatus: item.status,
        date: date
      });
    }
    return result;
  }

  formatDateRange(date: string) {
    let el = date.split('T')
    return el[0].replace('"', '');
  }

  formatDate(date: string) {
    console.log(date);
    let el = date.split('/')
    if (parseInt(el[0]) < 10) el[0] = '0' + el[0];
    if (parseInt(el[1]) < 10) el[1] = '0' + el[1];
    return el[2] + '-' + el[0] + '-' + el[1];
  }

}
