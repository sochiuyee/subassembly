import {fireEvent, render, screen} from "@testing-library/react"
import Button, {ButtonProps, ButtonSize, ButtonType} from "./button";

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('button', () => {
    it('should render the correct default', () => {
        render(<Button {...defaultProps}>Nice</Button>)
        const element = screen.getByText('Nice')
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component base on diffrent props', () => {
        render(<Button {...testProps}>Nice</Button>)
        const element = screen.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg klass')
    })
    it('should render a link when btnTypes equals link and href is provid', () => {
        render(<Button btnType={ButtonType.Link} href="http://dummyurl">Link</Button>)
        const element = screen.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render disabled button when disabled set to true', () => {
        render(<Button {...disabledProps}>Nice</Button>)
        // HTML是没有disable属性，需要类型断言为button
        const element = screen.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled()
      })
})
