import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import TopHeader from "./TopHeader";
import {useNavigate, Routes} from "react-router-dom"

test('render content ', () => {
    const component = render(<TopHeader></TopHeader>);
    component.getByText('Inicio')
})

