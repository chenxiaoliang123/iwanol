// JavaScript Document
 $(function () {
            Canvas1();
            Canvas2();
            Canvas3();
        });
        function Canvas1() {
            var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
            var doughnutData = [
                {
                    value: randomScalingFactor(),
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "事假"
                },
                {
                    value: randomScalingFactor(),
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "病假"
                },
                {
                    value: randomScalingFactor(),
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "公休假"
                },
                {
                    value: randomScalingFactor(),
                    color: "#949FB1",
                    highlight: "#A8B3C5",
                    label: "调休假"
                }
            ];
            var ctx = document.getElementById("Canvas1").getContext("2d");
            window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, { responsive: false });
        }
        function Canvas2() {
            var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
            var lineChartData = {
                labels: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                datasets: [
                    {
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("Canvas2").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData, {
                bezierCurve: false,
            });
        }
        function Canvas3() {
            var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
            var lineChartData = {
                labels: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                datasets: [
                    {
                        fillColor: "#578ebe",
                        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
                    }
                ]
            }
            var ctx = document.getElementById("Canvas3").getContext("2d");
            window.myLine = new Chart(ctx).Bar(lineChartData, {
                bezierCurve: false,
             
            });
        }