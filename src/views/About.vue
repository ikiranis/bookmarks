<template>
    <div class="container my-3">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">About</div>
                    <div class="card-body">
                        <p><strong>Boobkmarks App</strong> created by <strong><a href="http://apps4net.eu">apps4net</a></strong>
                            for experimental purposes and personal use. If you like the app you can support the
                            development, by donating</p>

                        <p>You can <strong>install</strong> the app at your server. Source code exist in two
                            parts.</p>

                        <ul>
                            <li><a href="https://bitbucket.org/rocean/bookmarks">Frontend (vue.js)</a></li>
                            <li><a href="https://bitbucket.org/rocean/bookmarks-api">Backend (Laravel)</a></li>
                        </ul>

                        <div id="accept_paypal_payment_form">
                            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                                <input name="cmd" value="_xclick" type="hidden">
                                <input name="business" value="kiranis@me.com" type="hidden">
                                <input name="item_name" value="Bookmarks App Donation" type="hidden">
                                <input name="currency_code" value="EUR" type="hidden">
                                <div class="row">

                                    <div class="col-lg-4 col-12 my-auto">
                                        <div class="mb-2">
                                            <span class="payment_subject"><strong>Bookmarks App Donation</strong></span>
                                        </div>
                                        <select id="amount" name="amount" class="mb-2">
                                            <option value="2">Donate 2 euro</option>
                                            <option value="5">Donate 5 euro</option>
                                            <option value="20">Donate 20 euro</option>
                                            <option value="50">Donate 50 euro</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-8 col-12 my-auto">
                                        <input name="no_shipping" value="0" type="hidden">
                                        <input name="no_note" value="1" type="hidden">
                                        <input name="bn" value="TipsandTricks_SP" type="hidden">
                                        <input name="return" value="https://bookmarks.apps4net.eu/about" type="hidden">
                                        <div class="wpapp_payment_button">
                                            <input src="https://www.paypal.com/en_US/i/btn/btn_paynowCC_LG.gif"
                                                   name="submit"
                                                   alt="Make payments with payPal - it's fast, free and secure!"
                                                   type="image">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({})
    }
</script>