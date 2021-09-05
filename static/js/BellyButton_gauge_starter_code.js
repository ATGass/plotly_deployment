// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    let samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    let sampleFilter = samples.filter(Object => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    let samplesResult = samplesArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = samplesResult.otu_ids
    let otu_labels = samplesResult.otu_labels
    let sample_values = samplesResult.sample_values

    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.
    let otu_idsBar = samplesResult.otu_ids.slice(0, 10).map(outId => `OTU: ${outId}`).reverse();
    let otu_labelsBar = samplesResult.otu_labels.slice(0, 10).reverse();
    let sample_valuesBar = samplesResult.sample_values.slice(0, 10).reverse();

    // Use Plotly to plot the bar data and layout.
    // Create the trace for the bar chart. 
    var barData = [
      trace = {
        x: sample_valuesBar, 
        y: otu_idsBar,
        text: otu_labelsBar,
        type: "bar",
        orientation: "h",
      }
    ];
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found in Subject: " + sample, 
      xaxis: {title: "Sample Sizes"},
    };
    Plotly.newPlot("bar", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
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
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample in Subject: " + sample,
      xaxis: {title: "OTU (Operational Taxonomic Unit) ID"},
      yaxis: {title: "Sample Sizes"},
    };
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    let metaDataResult = data.metadata.filter(sampleObj => sampleObj.id == sample)[0].wfreq;
    
    var gaugeData = [
      trace = {
        domain: { x: [0, 1], y: [0, 1] },
        value: metaDataResult,
        type: "indicator",
        mode: "gauge+number" ,
        gauge: {
          axis: { range: [0, 10] },
          bar: { color: "rgba(175 , 0, 0, .7)" },
          steps: [
            { range: [0, 2], color: "rgba(0, 0, 150, .01)"},
            { range: [2, 4], color: "rgba(0, 0, 150, .2)"},
            { range: [4, 6], color: "rgba(0, 0, 150, .4)" },
            { range: [6, 8], color: "rgba(0, 0, 150, .6)" },
            { range: [8, 10], color: "rgba(0, 0, 150, .8)"},
          ]},
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: 'Belly Button Washing Frequency<br>Scrubs per Week'
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout));
  });
}
