import Accordion from 'react-bootstrap/Accordion';
import Footer from '../Footer';
import Header from '../Header';
import { useState } from 'react';

const FaqPage = () => {
    const [faqs] = useState([
        {
            question: 'Who do I contact for an invoice for my booking?',
            answer: "Need an invoice or a receipt for your records? We recommend contacting the booking site used to secure the reservation.<br/><br/>If you would like to contact the booking site, most contact information can be found at the bottom of your booking confirmation. Alternatively, booking sites will have a contact page, where you will find all contact details including direct phone numbers to the booking sites support center.<br/><br/>Why can't trivago provide me with the booking invoice? As trivago is a hotel and price comparison website, bookings are not made directly with us. We find your ideal hotel and compare prices from different websites. As a result, we keep no records of transactions made through the booking sites. This includes any payment information.<br/><br/>Need help remembering who you booked with? Follow the steps on this page."
        },
        {
            question: 'How are the prices of deals displayed on trivago?',
            answer: "Want to know how far your buck is going? On trivago, we like to give you plenty of options. On our results page, you'll see the price listed per hotel, per night. The price shown is the net rate and does not include any additional taxes or fees.Click here to find out more.<br/><br/>You can view the full price breakdown on the booking site that is offering the deal. Just go on our website and click on the deal listed. You will be redirected to the booking site.<br/><br/>What if you have a question about a deal on trivago? Check out this article.<br/><br/>Did you notice that the price changed when you were redirected to the booking site? Click here to find out why.<br/><br/>If you would like to learn more about how trivago works, follow this link."
        },
        {
            question:
                'Why is it possible that there may be a different price on the booking site than on trivago?',
            answer: 'We are a search and price comparison site, not a booking site. When you click on an accommodation offer, we transfer you to the booking site that is offering you the deal you have chosen.<br/><br/>trivago works with many different websites, and the rates and availability they provide us with change constantly. trivago frequently updates its site to try to ensure that the information you see on our site is correct. On occasion though, you may not find the exact same offer you clicked on when you land on the booking site. This can be for a number of reasons. Perhaps the booking site gave us inaccurate information, or maybe they have sold out of the rates they offered us everyone loves a good deal!<br/><br/>Please contact us if you see such discrepancies, so we can deal with the issue ASAP.'
        },
        {
            question: 'Who do I contact to cancel or modify my booking?',
            answer: "To cancel or change your booking, its always best to speak to the booking site directly.Since the booking site is responsible for your reservation, they would be able to help you! Most contact information can be found at the bottom of your booking confirmation. Alternatively, booking sites will have a contact page, where you will likely find all contact details including direct phone numbers to the booking sites support center.<br/><br/>Having trouble contacting the booking site? Send us a message and we will try our best to get you connected!<br/><br/>Cancelling or modifying due to an error while searching on trivago? You might find your answer on this page.<br/><br/>Can't remember who you booked with? You can find the travel provider's name on your confirmation email. If you can't find your booking confirmation, click here for tips.<br/><br/>You can use our handy search form below to find their contact page."
        },
        {
            question: 'Who do I contact about a refund?',
            answer: "Something went wrong? Need your money back? Do the following issues apply to you?<br/><br/>You've got a double booking<br/><br/>Your refund hasn't arrived in your account yet<br/><br/>There was no reservation upon arrival at the hotel<br/><br/>While wed love to help, the best way to resolve any of the above-mentioned issues is to directly contact the booking site. Cant remember the name of the booking site you used? No worries, check out this page for some handy tips and tricks.<br/><br/>Are you looking for a refund because of an error on trivago while searching? Please visit this page for more information."
        }
    ]);

    return (
        <div>
            <Header />
            <section className="proper-min-height mt-4 mb-4">
                <h1 className="text-center mb-4">Faq</h1>
                <Accordion className="pe-5 ps-5" defaultActiveKey="">
                    {faqs.map((faq: any, index: number) => (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>{faq.question}</Accordion.Header>
                            <Accordion.Body>
                                <span dangerouslySetInnerHTML={{ __html: faq.answer }}></span>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </section>
            <Footer />
        </div>
    );
};

export default FaqPage;
