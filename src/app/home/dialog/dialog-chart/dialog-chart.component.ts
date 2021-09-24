import { Component, OnInit, Inject, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styleUrls: ['./dialog-chart.component.css']
})
export class DialogChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;
  log: Array<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<any>, private zone: NgZone) {
    this.log = data;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);
      let title = chart.titles.create();
      title.text = 'Chart Title';

      let data = this.preprocessData(this.log);

      chart.data = data;
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.title.text = 'Time';
      categoryAxis.dataFields.category = "time";
      let valueYAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueYAxis.title.text = 'Status';
      valueYAxis.renderer.minWidth = 20;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryX = "time";
      series.dataFields.valueY = "status";

      let bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.tooltipText = "Time: {categoryX} \n Status: {valueY} {name}";
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;

      chart.legend = new am4charts.Legend();
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  preprocessData(data: any) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let unixDate = item.time;
      let date = new Date(unixDate * 1000).toLocaleDateString("en-US");
      let el = date.split("/");
      let dateString = el[2] + "-" + el[0] + "-" + el[1];
      result.push({
        time: dateString,
        status: item.status
      });
    }
    return result;
  }

}
