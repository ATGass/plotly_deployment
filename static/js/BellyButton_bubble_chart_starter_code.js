// Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        type: "scatter",
        mode: "markers",
        marker: { 
          size: sample_values,
          color: otu_ids,
          colorscale: "RdBu"
        } 
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample in Subject: " + sample,
        xaxis: {title: "OTU (Operational Taxonomic Unit) ID"},
        yaxis: {title: "Sample Sizes"}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  });
}
