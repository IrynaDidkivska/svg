function createBarChart(data, width, height, color) {
  let chart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  chart.setAttribute("width", width);
  chart.setAttribute("height", height);
  chart.style.border = "1px solid #ccc";

  let max = Math.max(...data);
  let scale = height / max;
  let barWidth = Math.floor(width / data.length);

  for (let i = 0; i <= 5; i++) {
    let yPosition = height - (height / 5) * i;
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    line.setAttribute("x1", 0);
    line.setAttribute("x2", width);
    line.setAttribute("y1", yPosition);
    line.setAttribute("y2", yPosition);
    line.setAttribute("stroke", "#ddd");

    chart.appendChild(line);

    let label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", 5);
    label.setAttribute("y", yPosition - 5);
    label.setAttribute("fill", "#333");
    label.style.fontSize = "12px";
    label.textContent = Math.round((max / 5) * i);
    chart.appendChild(label);
  }

  let tooltip = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tooltip.setAttribute("visibility", "hidden");
  tooltip.setAttribute("fill", "black");
  tooltip.setAttribute("font-size", "14px");
  tooltip.setAttribute("font-weight", "bold");
  chart.appendChild(tooltip);

  for (let i = 0; i < data.length; i++) {
    let bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    let barHeight = data[i] * scale;
    bar.setAttribute("height", barHeight + "px");
    bar.setAttribute("width", barWidth - 4 + "px");

    bar.setAttribute("y", height - barHeight);
    bar.setAttribute("x", barWidth * i + 2);

    bar.style.fill = color;
    bar.style.cursor = "pointer";

    bar.addEventListener("mouseover", function () {
      this.style.fill = "red";
      tooltip.setAttribute("x", barWidth * i + barWidth / 2);
      tooltip.setAttribute("y", height - barHeight - 10);
      tooltip.textContent = data[i];
      tooltip.setAttribute("visibility", "visible");
    });

    bar.addEventListener("mouseout", function () {
      this.style.fill = color;
      tooltip.setAttribute("visibility", "hidden");
    });

    chart.append(bar);

    let xlabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    xlabel.setAttribute("x", barWidth * i + barWidth / 4);
    xlabel.setAttribute("y", height + 15);
    xlabel.setAttribute("fill", "#333");
    xlabel.style.fontSize = "12px";
    xlabel.textContent = `#${i + 1}`;
    chart.appendChild(xlabel);
  }

  return chart;
}
