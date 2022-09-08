import Alert, {AlertType, BaseAlertProps} from "./alert"
import {fireEvent, render, screen} from "@testing-library/react"

const testProps: BaseAlertProps = {
    message: 'test message',
    description: 'test description'
}

describe('alert', () => {
    it('should render the correct props', () => {
        render(<Alert {...testProps}></Alert>)
        const element = screen.getByLabelText('ul')
    })
})