import React, { useState } from "react";
import axios from "axios";
//import AnimatedInput from "react-native-animated-input";
import { AnimateOnChange } from 'react-animation'


function Form({ data }) {
  const [state, setState] = useState({
    "Living area": "",
    Bedroom: "",
    Province: "",
    "Property Type": "",
    "Property Subtype": "Apartment",
    "Surface of the plot": "0",
    HasGarden: "No",
    "Garden surface": "0",
    "Kitchen Type": "Equipped",
    "Swimming pool": "No",
    Furnished: "No",
    HasFireplace: "No",
    HasTerrace: "No",
    "Terrace surface": "0",
    "Number of frontages": "0",
    "Building condition": "As New",
    "Prediction Price": "000.000",
  });

  const [noGarden, setNoGarden] = useState(true);
  
  const [noTerrace, setNoTerrace] = useState(true);


  const onLAreaChange = (e) => {
    setState({ ...state, "Living area": e.target.value });
  };
  const onBedroomChange = (e) => {
    setState({ ...state, Bedroom: e.target.value });
  };
  const onProvinceChange = (e) => {
    setState({ ...state, Province: e.target.value });
  };
  const onPTypeChange = (e) => {
    setState({ ...state, "Property Type": e.target.value });
  };
  const onSubPropChange = (e) => {
    setState({ ...state, "Property Subtype": e.target.value });
  };
  const onPlotSurfChange = (e) => {
    setState({ ...state, "Surface of the plot": e.target.value });
  };
  const onGardenChange = (e) => {
    setState({ ...state, HasGarden: e.target.value }); setNoGarden(!noGarden);
  };
  const onGAreaChange = (e) => {
    setState({ ...state, "Garden surface": e.target.value });
  };
  const onKitchenChange = (e) => {
    setState({ ...state, "Kitchen Type": e.target.value });
  };
  const onSwimmingChange = (e) => {
    setState({ ...state, "Swimming pool": e.target.value });
  };
  const onFurnishedChange = (e) => {
    setState({ ...state, Furnished: e.target.value });
  };
  const onFireplaceChange = (e) => {
    setState({ ...state, HasFireplace: e.target.value });
  };
  const onTerraceChange = (e) => {
    setState({ ...state, HasTerrace: e.target.value }); setNoTerrace(!noTerrace);
  };
  const onTAreaChange = (e) => {
    setState({ ...state, "Terrace surface": e.target.value });
  };
  const onNFrontChange = (e) => {
    setState({ ...state, "Number of frontages": e.target.value });
  };
  const onBuildCChange = (e) => {
    setState({ ...state, "Building condition": e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      "Living area": parseInt(state["Living area"]),
      Bedroom: parseInt(state.Bedroom),
      Province: state.Province,
      "Property Type": state["Property Type"],
      "Property Subtype": state["Property Subtype"],
      "Surface of the plot": parseInt(state["Surface of the plot"]),
      HasGarden: state.HasGarden,
      "Garden surface": parseInt(state["Garden surface"]),
      "Kitchen Type": state["Kitchen Type"],
      "Swimming pool": state["Swimming pool"],
      Furnished: state.Furnished,
      HasFireplace: state.HasFireplace,
      HasTerrace: state.HasTerrace,
      "Terrace surface": parseInt(state["Terrace surface"]),
      "Number of frontages": parseInt(state["Number of frontages"]),
      "Building condition": state["Building condition"],
    };
    console.log("My form data: ", data);
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: "https://ceren-app.herokuapp.com/predict", 
      data: data
    })
     // .then((res) => console.log("My response: ", res))
      //.then((res) => console.log("The pediction value: ", res.data['Prediction Price']))
      .then((res) => setState({ ...state, "Prediction Price": parseFloat(res.data['Prediction Price']).toFixed(3)})) 
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      <div className="card-image"></div>
      <div className="header-lg">
        <div className="title"><h1>ImmoEliza</h1></div>
      </div>
      <form className="card-form" onSubmit={handleSubmit}>

      <div className="input areasm">
        <label htmlFor="area" className="input-label">Area(*)</label>
        <input
          type="number"
          id="area"
          className="area_int input-field"
          name="area"
          value={state["Living area"]}
          onChange={onLAreaChange}
          required
        />
      </div>

      <div className="input ptsm">
        <label htmlFor="property-type" className="input-label">Property Type(*)</label>
        <select
          id="property-type"
          className="property_type input-field"
          name="property-type"
          value={state["Property Type"]}
          onChange={onPTypeChange}
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
        </select>
      </div>

      <div className="input subptsm">
        <label htmlFor="subproperty-type" className="input-label">Sub-Property</label>
        <select
          id="subproperty-type"
          className="subproperty_type input-field"
          name="subproperty-type"
          value={state["Property Subtype"]}
          onChange={onSubPropChange}
        >
          {data["Property Subtype"].default.map((pType) => (
            <option value={pType}>{pType}</option>
          ))}
        </select>
      </div>

      <div className="input md provm">
        <label htmlFor="province" className="input-label">Province(*)</label>
        <input
          id="province"
          list="province"
          name="province"
          className="input-field"
          value={state.Province}
          onChange={onProvinceChange}
          required
        />
        <datalist id="province">
          {data.Province.default.map((pName) => (
            <option value={pName} />
          ))}
        </datalist>
      </div>

      <div className="input md">
        <label htmlFor="plot_surface" className="input-label">Plot Surface</label>
        <input
          type="number"
          id="plot_surface"
          className="plot_surface input-field"
          name="plot-surface"
          value={state["Surface of the plot"]}
          onChange={onPlotSurfChange}
        />
      </div>

      <div className="input md roomsm">
        <label htmlFor="rooms-number" className="input-label">Bedrooms(*)</label>
        <input
          type="number"
          id="rooms-number"
          className="rooms input-field"
          name="rooms-number"
          value={state.Bedroom}
          onChange={onBedroomChange}
          required
        />
      </div>
      
      <div className="input md kitchsm" >
        <label htmlFor="kitchen-type" className="input-label">Kitchen</label>
        <select
          className="kitchen_type input-field"
          id="kitchen-type"
          name="kitchen-type"
          value={state["Kitchen Type"]}
          onChange={onKitchenChange}
        >
          {data["Kitchen Type"].default.map((kType) => (
            <option value={kType}>{kType}</option>
          ))}
        </select>
      </div>

      <div className="input gardsm">
        <label htmlFor="garden" className="input-label">Garden</label>
        <select
          id="garden"
          className="garden input-field"
          name="garden"
          value={state.HasGarden}
          onChange={onGardenChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      
      <div className="input md-size gardareasm">
        <label htmlFor="garden-area" className="input-label">Garden Area</label>
        <input
          type="number"
          id="garden-area"
          className="garden_area input-field"
          name="garden-area"
          value={state["Garden surface"]}
          onChange={onGAreaChange}
          disabled={noGarden}
        />
      </div>

      <div className="input swpsm">
        <label htmlFor="swimming-pool" className="input-label">Swimming Pool</label>
        <select
          id="swimming-pool"
          className="swimming_pool input-field"
          name="swimming-pool"
          value={state["Swimming pool"]}
          onChange={onSwimmingChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="input furnsm">
        <label htmlFor="furnished" className="input-label">Furnished</label>
        <select
          id="furnished"
          className="furnished input-field"
          name="furnished"
          value={state.Furnished}
          onChange={onFurnishedChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="input firesm">
        <label htmlFor="Fireplace" className="input-label">Fireplace</label>
        <select
          id="Fireplace"
          className="Fireplace input-field"
          name="Fireplace"
          value={state.HasFireplace}
          onChange={onFireplaceChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="input terrasm">
        <label htmlFor="terrace" className="input-label">Terrace</label>
        <select
          id="terrace"
          className="terrace input-field"
          name="terrace"
          value={state.HasTerrace}
          onChange={onTerraceChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="input md-size terrareasm">
        <label htmlFor="terrace-area" className="input-label">Terrace Area</label>
        <input
          type="number"
          id="terrace-area"
          className="terrace_area input-field"
          name="terrace-area"
          value={state["Terrace surface"]}
          onChange={onTAreaChange}
          disabled={noTerrace}
        />
      </div>

      <div className="input md numfrosm">
        <label htmlFor="Number_frontages" className="input-label">Number of frontages</label>
        <input
          type="number"
          id="Number_frontages"
          className="Number_frontages input-field"
          name="Number-frontages"
          value={state["Number of frontages"]}
          onChange={onNFrontChange}
        />
      </div>

      <div className="input md budconsm">
        <label htmlFor="building-condition" className="input-label">Building Condition</label>
        <select
          id="building-condition"
          className="bulding_condition input-field"
          name="building-condition"
          value={state["Building condition"]}
          onChange={onBuildCChange}
        >
          <option value="As New">As New</option>
          <option value="Good">Good</option>
          <option value="To renatovate">To renovate</option>
        </select>
      </div>

        <input type="submit" value="submit" className="action-button" />
      </form>

      <div className="prediction">
        <form className="card-form">
        <fieldset>
          <legend>Evaluation</legend>
        
<AnimateOnChange
  durationOut="500"
><h1>€ {state["Prediction Price"]},00</h1></AnimateOnChange>
        </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Form;
