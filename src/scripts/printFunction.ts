import InitialValues from "./initialValues";
import CalcPosition from "./calcPosition";
const initialValues = InitialValues.getInstance();
const calcPosition = CalcPosition.getInstance();


const printInitialViewPortStats = () => {
    console.log("=======================");
    console.log("window width is " + window.innerWidth);
    console.log("viewport width is " + window.visualViewport.width);
    console.log("WIDTH", initialValues.getWidth());
    console.log("--------------------");
    console.log("window height is " + window.innerHeight);
    console.log("viewport height is " + window.visualViewport.height);
    console.log("HEIGHT", initialValues.getHeight());
    console.log("=======================");
    console.log("ASPECT_RATIO", initialValues.getWidth() / initialValues.getHeight());
    console.log("=======================");
    console.log("FULL_LAT_LIMIT", initialValues.getFullLatLimit());
    console.log("FULL_VERTICAL_LIMIT", initialValues.getFullVertLimit());
    console.log("SUB_INITAL_LAT_POS", initialValues.getInitial_X());
    console.log("INITIAL_Y_POSITION", initialValues.getInitial_Y());
    console.log("OCEAN_LAT_LIMIT", initialValues.getOceanLatLimit());
    console.log("OCEAN_VERT_LIMIT", initialValues.getOceanVertLimit());
    console.log("VAR_DEPTH", calcPosition.calcDepthLimit());
    console.log("--------------------");
    console.log("=======================");
};