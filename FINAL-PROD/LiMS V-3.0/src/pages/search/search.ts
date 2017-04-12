import { GetBook } from './../../providers/getBook.service';
import { DetailViewPage } from './../detail-view/detail-view';
import { HomeBodyService } from './../../providers/home-body.service';
import { CategoriesPage } from './../categories/categories';
import { WishListService } from './../../providers/wishList.service';
import { NavController, ToastController } from 'ionic-angular';
import { IssueService, data } from '../../providers/issue-service';
import { Search, Data } from './../../providers/search.service';
import { Input, Output, EventEmitter } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import  {  LoadingController  }  from  'ionic-angular';
import { AdalService } from 'ng2-adal/core';
declare var yam:any;
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  homeBook;

  @Output()
  bookChange = new EventEmitter();
  @Input()
  get book() {
    return this.homeBook
  }
  set book(val) {
    this.homeBook = val;
    this.bookChange.emit(this.homeBook)
  }
  slideOptions = {
    pager: true
  }
    errorMessage: string;
  bookWish = [];
  Books: any[];
  showStyle: false;
  token;
  mid: string;
  loaded: any;
  length: boolean;
  originalCategories: any[];
  categories: any[];
  searchInput: string;
  showSearch: boolean;
  categorisedBooks: any[];
  showSlides: boolean = true;
  selectTitle: boolean = false;
  selectAuthor: boolean = false;
  constructor(private wishListService: WishListService, public  loadingCtrl:  LoadingController, private toastCtrl: ToastController, public nav: NavController, private search: Search, public adalService: AdalService, public navParams: NavParams, public popoverCtrl: PopoverController, public HomeBodyService: HomeBodyService, private getBook: GetBook,private IssueService:IssueService) {
    this.token = HomeBodyService.token;

    this.mid = HomeBodyService.mid;
  }

  getCategories = function () {
    console.log("in getCategories")

    this.search.getCategories(this.token).subscribe(data => {
      this.categories = data[0].categories;
      this.originalCategories = this.categories;
     
    })

  }

  getAllBooks = function () {

    console.log("in get all books")
    this.search.getAllBooks(this.token).subscribe(data => {
      this.Books = data,
        error => console.log(error),

        this.categorisedBooks = this.Books;
      console.log("heloooooooooooooo", this.Books)

    })
  }
  getItems = function (ev) {
    // Reset items back to all of the items
    this.showSlides = false;
    // console.log("Bookssssssssss",this.Books)
    this.categorisedBooks = this.Books;
    console.log("Hmmmmmmmmmm" + this.categorisedBooks);
    // set val to the value of the ev target
    var val = ev;

    // if the value is an empty string don't filter the items
    if (val && val != ' ') {
      if (this.selectAuthor == true) {
        this.categorisedBooks = this.categorisedBooks.filter((item) => {
          return (item.authors.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else if (this.selectTitle == true) {
        this.categorisedBooks = this.categorisedBooks.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

    }
    // val='';
  }
  setTitle = function () {
    this.selectTitle = true;
    this.selectAuthor = false;
    this.selectPublisher = false;
    // console.log("titleeeeeeeeeeeeeeeeeeeeeee")
  }
  setAuthor = function () {
    this.selectTitle = false;
    this.selectAuthor = true;
    this.selectPublisher = false;
    // console.log("authorrrrrrrrrrrrrrrrrrr")
  }
  goBackToCategories = function () {
    this.showSlides = true;

    // console.log("iiiiiiiiiii");
  }
  getByCategory = function (category) {
    this.showSlides = false
    console.log("in get by Categories")
    this.search.getByCategory(category, this.token).subscribe(data => {
      console.log("coming data", data);
      for (let f = 0; f < data.length; f++)
        this.categorisedBooks.push(data[f]);
      console.log("cattttttttttttttt", this.categorisedBooks)

    })
  }
  showDetailView(book,yam) {
    // this.book=this.categorisedBooks[index];
    this.book = book;
    console.log("Book title" + this.book.title);
    this.getBook.putBook(this.book);

    // console.log("index",index);
    // console.log("book is",this.book)
    this.nav.push(DetailViewPage);
    // this.nav.push(DetailViewPage);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(CategoriesPage, this.categories, { cssClass: "categoriesPopover" });
    popover.onDidDismiss(data => {
      console.log('test1---------->');
      console.log(data);

      if (data != null) {
        this.categorisedBooks = [];
        for (let k = 0; k < data.length; k++) {
          if (data[k].flag == true)
            this.getByCategory(data[k].Title);
          console.log("aaaa", this.categorisedBooks)
        }
      }
      if (data == null) {
        this.getCategories();
      }
     
    });
    popover.present({
      ev: myEvent
    });
  }
  presentLoading()  {
    let  loader  =  this.loadingCtrl.create({  content:  "Getting All Books...",  duration:  2000  });
    loader.present();
  }

  showToastWithCloseButton = function (message: string, getColor: string) {
    let toast = this.toastCtrl.create({
      message: message,
      showCloseButton: true,
      closeButtonText: 'OK',
      position: 'top',

      cssClass: getColor
    });
    toast.present();
  }

  showToast = function (message: string, getColor: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      cssClass: getColor,
      duration: 3000
    });
    toast.present();
  }
  requestBook = function (isbn) {
    this.IssueService.request(this.mid,isbn, this.token)
      .subscribe(response => {
        console.log(response);
        if (response._body === 'failed') {
          console.log('Sorry. Book not available right now...', 'info');
          this.showToast('Sorry. Book not available right now...');
          this.isDisabled = true;
        }
        else if (response._body === 'Too many requests') {
          console.log('Too many requests for the same book. Please try later ...');
          this.showToast('Too many requests for the same book. Please try later ...', 'error');
          this.isDisabled = true;
        }

        else if (response._body === 'Max') {
          console.log('Sorry. You can not take more than 3 books ...');
          this.showToast('Sorry. You can not take more than 3 books ...', 'error');
          this.isDisabled = true;
        }
        else if (response._body === 'already Issued') {
          console.log('Sorry. You have already Issued this book ...');
          this.isDisabled = true;
          this.showToast('Sorry. You have already Issued this book ...', 'oops');
        }
        else if (response._body === 'Already Requested') {
          console.log('Sorry. You have already Requested this book ...');
          this.isDisabled = true;
          this.showToast('Sorry. You have already Requested this book ...', 'info');
        }
        else {
          console.log('Successfully requested for book. Collect book from kalinga library within 2 days');
          this.showToast('Successfully requested for book. Collect book from kalinga library within 2 days', 'success');
          this.isDisabled = true;
        }
      }, error => {
        console.error("error fetching");
      });

  }

  addWish(isbn) {
    //  this.isbn=this.getBook();
    console.log('in add wish-------1:' + isbn)
    this.wishListService.addtowishlist(this.mid, isbn, this.adalService.getCachedToken(this.token)).subscribe(
      response => {
        console.log(response);
        // console.log(request);
        this.bookWish = response
        console.log('in loop----------->', response._body);
        console.log('--->', response)
        if (response === 'Already present') {
          this.showToast('Already in Wishlist!!', 'success');
        }
        else {
          console.log("hey in add wish" + this.bookWish);
          console.log("successssssssssssssssss");
          this.showToast('Successfully added to Wishlist!!', 'success');
        }
      },
      error => console.log(error)
    )
  }

  ngOnInit() {
    this.presentLoading();
    this.getCategories();
    // console.log(this.loaded);
    this.getAllBooks();
    this.showSearch = true;
    console.log("Categoriesed Boooksss" + this.categorisedBooks);
    if (this.navParams.get('flag')) {
      this.showSearch = this.navParams.get('flag');
      console.log("in navparamssssss", this.showSearch);

    }
    //  console.log("serach------------");
    this.searchInput = "";
    setTimeout(() => {
      this.loaded = true;
    }, 2500);

  }
}


