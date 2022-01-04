import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";
test('renders Global Crypto Stats as a text', ()=>{
    //arrange
    render(<Homepage/>);

    //act
    //..nothing

    // assert
    const cryptoGlobal = screen.getByText('Crypto Global Stats');

    expect(cryptoGlobal).toBeInTheDocument();
});