Balanced.BankAccountsIndexRoute = Balanced.ShowResource.extend({
    param: 'bank_account_id',
    title: 'Activity',
    resource: 'bank_accounts',
    renderTemplate: function () {
        this.render('marketplace/activity');
    }
});

Balanced.BankAccountRoute = Balanced.ShowResource.extend({
    param: 'bank_account_id',
    title: 'Bank Account',
    resource: 'bank_accounts'
});

Balanced.BankAccountTransactionsRoute = Balanced.ShowResource.extend({
    param: 'bank_account_id',
    title: 'Bank Account Transactions',
    resource: 'bank_account',

    model: function(params) {
        var marketplace = this.modelFor('marketplace');
        bank_account = window.location.hash.split('/')[4];
        var uri = marketplace.get('web_uri') + '/bank_accounts/' + bank_account + '/transactions';

        return {
            'uri': uri + Balanced.MigrationUtils.EMBEDDED_QUERY_APPEND,
            'title': this.title,
            'marketplace': marketplace
        };
    }
});
