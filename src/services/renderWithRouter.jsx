import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import {createMemoryHistory} from 'history'

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const returnFromRender = render(
    <Router history={customHistory}>{component}</Router>
  );
  return {...returnFromRender, history: customHistory};
}

export default renderWithRouter;
