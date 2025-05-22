import { Link } from 'react-router-dom'

const TermsAndConditions = () => {
    return (
        <section className='terms-and-conditions-container'>
            <div className='terms-and-conditions-background'>
                <div>
                    <h1>Acceptance of Terms</h1>
                    <p>By accessing or using the services provided on this website, you agree to abide by these Terms and Conditions and all applicable laws and regulations. If you do not agree with these Terms, you are prohibited from using our site.</p>
                </div>

                <div>
                    <h1>Vehicle Listings, Prices, and Availability</h1>
                    <p>All vehicle listings, prices, and availability on this website are subject to change without notice. While we strive for accuracy, Naan-auto does not guarantee the accuracy of vehicle descriptions, pricing, or availability. We reserve the right to correct any errors or omissions at our discretion.</p>
                </div>
                <div>
                    <h1>Limitation of Liability and Disclaimers</h1>
                    <p> Naan-auto is not responsible for any damages, losses, or other consequences that may result from your use of this website, the purchase of any vehicle, or any discrepancies in vehicle descriptions or prices. Vehicles are sold ‘as-is’ unless otherwise stated in writing.</p>
                </div>

                <div>
                    <h1>Warranty and Return Policy</h1>
                    <p>
                        All vehicles are sold 'as-is' unless otherwise noted in the sales agreement or a separate warranty is provided. Any warranties or guarantees are subject to the terms outlined in the accompanying vehicle documentation. Returns are not accepted unless the vehicle has been misrepresented, and any claims must be made within 30 days of purchase.
                    </p>
                </div>
                <div>
                    <h1>Privacy Policy and Data Collection</h1>
                    <p>We respect your privacy. By using our website, you consent to our collection and use of your personal information in accordance with our Privacy Policy. We do not sell or share your data with third parties, except as required by law or as described in our Privacy Policy. For more imformation click
                        <Link to='/privacypolicy'>here</Link></p>
                </div>
                <div>
                    <h1>Payment and Financing Terms</h1>
                    <p>
                        All vehicle purchases are subject to payment verification. Financing options are available through third-party lenders, and you will be subject to their individual terms and approval. We are not responsible for third-party lender decisions. Please review your financing agreement carefully before proceeding with the transaction.
                    </p>
                </div>
                <div>
                    <h1>Title Transfer, Registration, and Taxes</h1>
                    <p>
                        It is the responsibility of the purchaser to ensure the proper transfer of the vehicle title and registration. Naan-auto will assist with title transfer and registration at the time of sale for a separate fee. Sales tax is calculated based on the total purchase price of the vehicle and must be paid at the time of transaction.
                    </p>
                </div>
                <div>
                    <h1>Vehicle Inspection and Condition Disclosure</h1>
                    <p>
                        All used vehicles sold by Naan-auto are subject to inspection. Any known defects or issues will be disclosed at the time of sale. Please ask for a vehicle history report, and review the condition report before purchasing. Naan-auto makes no guarantees as to the vehicle’s performance beyond the terms of any stated warranty.
                    </p>
                </div>
                <div>
                    <h1>Dispute Resolution and Governing Law</h1>
                    <p>
                        These Terms and Conditions shall be governed by the laws of the State of Florida. Any disputes arising out of or relating to these Terms and Conditions will be resolved in the courts located in Santa Rosa County, Florida.
                    </p>
                </div>
                <div>
                    <h1>Modifications to Terms</h1>
                    <p>
                        Naan-auto reserves the right to modify these Terms and Conditions at any time without notice. All changes will be posted on this page, and your continued use of the website constitutes your acceptance of the updated terms.
                    </p>
                </div>
                <div>
                    <h1>Indemnification</h1>
                    <p>
                        You agree to indemnify and hold harmless Naan-auto and its affiliates, officers, agents, and employees from any claims, damages, or expenses arising from your use of this website, purchase of a vehicle, or violation of these Terms and Conditions.
                    </p>
                </div>
                <div>
                    <h1>Malicious Use of Website</h1>
                    <p>
                        You agree not to use this website for any unlawful or malicious purposes. This includes, but is not limited to, attempting to interfere with the operation of the website, gain unauthorized access to our systems, engage in fraud, or violate any laws or regulations. Malicious activities, including but not limited to hacking, data breaches, or the distribution of harmful software, will result in immediate suspension of access to this website and could lead to legal action, including criminal prosecution, under applicable state and federal laws.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default TermsAndConditions