import { $$, $ } from '@wdio/globals';
import Page from './page';

class HoversPage extends Page { 

    get userImages () { return $$('.figure') }

    get userNames () { return $$('.figcaption > h5') }

    get profileLinks () { return $$('.figcaption > a') }

    get userPageElement () { return $('h1') } 

    open () {
        return super.open('/hovers')
    }

}

export default new HoversPage()