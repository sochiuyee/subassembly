import React from "react";
import {render, RenderResult, screen} from '@testing-library/react'

import Menu, {MenuProps} from "./menu"
import MenuItem from "./menuItem"

const testProps:MenuProps = {
    defaultIndex: '0',
    onSelect:jest.fn()
}

const testVerProps:MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props:MenuProps) => {
    return(
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
        </Menu>
    )
}

let wrapper:RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disableElement:HTMLElement

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disableElement).toHaveClass('menu-item is-disabled')
    })

    it('click items should change active and call the right callback', () => {

    })

    it('should render vertical mode when mode is set to vertical', () => {

    })
})