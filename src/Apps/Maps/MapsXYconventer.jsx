import React, { useState } from "react";
import styled from "styled-components";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import proj4 from "proj4";
var firstProjection =
  'PROJCS["WGS 84 / UTM zone 36N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],UNIT["metre",1,AUTHORITY["EPSG","9001"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",33],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],AUTHORITY["EPSG","32636"],AXIS["Easting",EAST],AXIS["Northing",NORTH]]';
var secondProjectin =
  'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`;

const MapsXYconventer = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [latLong, setLatlog] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLatlog(
      proj4(firstProjection, secondProjectin, [parseInt(x), parseInt(y)])
    );
  };
  return (
      <ContentContainer className="ma2">
        <form onSubmit={handleSubmit}>
          <FormGroup label="X coordinate:" labelFor="inputXcoordinate">
            <InputGroup
              id="inputXcoordinate"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Y coordinate:" labelFor="inputYcoordinate">
            <InputGroup
              id="inputYcoordinate"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">Convert</Button>
        </form>
        {latLong && <>{latLong[1]},{latLong[0]}</>}
      </ContentContainer>
  );
};

export default MapsXYconventer;
