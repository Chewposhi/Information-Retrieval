const MOCK_DATA = [
    {"id":1,"title":"Pale Cocoon (Peiru Kokun)","genre":"Animation|Sci-Fi","description":"Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.","release":"10/15/2022","poster_url":"http://dummyimage.com/218x100.png/dddddd/000000"},
{"id":2,"title":"1612: Khroniki smutnogo vremeni","genre":"Drama|Fantasy|War","description":"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.","release":"7/21/2022","poster_url":"http://dummyimage.com/150x100.png/5fa2dd/ffffff"},
{"id":3,"title":"Army of Crime (L'armée du crime)","genre":"Drama|Thriller|War","description":"Suspendisse ornare consequat lectus.","release":"3/14/2022","poster_url":"http://dummyimage.com/237x100.png/5fa2dd/ffffff"},
{"id":4,"title":"Great Dictator, The","genre":"Comedy|Drama|War","description":"Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.","release":"7/23/2022","poster_url":"http://dummyimage.com/187x100.png/dddddd/000000"},
{"id":5,"title":"Premature Burial, The","genre":"Horror","description":"Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy.","release":"8/1/2022","poster_url":"http://dummyimage.com/238x100.png/cc0000/ffffff"},
{"id":6,"title":"Trash","genre":"Drama","description":"Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.","release":"8/5/2022","poster_url":"http://dummyimage.com/235x100.png/dddddd/000000"},
{"id":7,"title":"Whole","genre":"Documentary","description":"Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero.","release":"10/2/2022","poster_url":"http://dummyimage.com/243x100.png/ff4444/ffffff"},
{"id":8,"title":"Comes a Horseman","genre":"Drama|Romance|Western","description":"Suspendisse accumsan tortor quis turpis. Sed ante.","release":"10/28/2022","poster_url":"http://dummyimage.com/203x100.png/5fa2dd/ffffff"},
{"id":9,"title":"Devil's Rejects, The","genre":"Action|Crime|Horror","description":"Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.","release":"8/24/2022","poster_url":"http://dummyimage.com/190x100.png/ff4444/ffffff"},
{"id":10,"title":"Judas Kiss","genre":"Crime|Drama|Thriller","description":"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.","release":"2/23/2023","poster_url":"http://dummyimage.com/133x100.png/ff4444/ffffff"},
{"id":11,"title":"Diary of a Chambermaid","genre":"Drama","description":"Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.","release":"6/30/2022","poster_url":"http://dummyimage.com/107x100.png/cc0000/ffffff"},
{"id":12,"title":"Suddenly, Last Winter (Improvvisamente l'inverno scorso)","genre":"Documentary","description":"Vivamus vel nulla eget eros elementum pellentesque.","release":"2/11/2023","poster_url":"http://dummyimage.com/219x100.png/5fa2dd/ffffff"},
{"id":13,"title":"Fade to Black","genre":"Mystery|Thriller","description":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.","release":"1/10/2023","poster_url":"http://dummyimage.com/193x100.png/dddddd/000000"},
{"id":14,"title":"With Friends Like These...","genre":"Comedy","description":"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.","release":"1/27/2023","poster_url":"http://dummyimage.com/205x100.png/ff4444/ffffff"},
{"id":15,"title":"Son of a Gun","genre":"Action|Crime|Drama","description":"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.","release":"12/26/2022","poster_url":"http://dummyimage.com/228x100.png/cc0000/ffffff"},
{"id":16,"title":"Jack-O","genre":"Horror","description":"Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.","release":"4/11/2022","poster_url":"http://dummyimage.com/249x100.png/dddddd/000000"},
{"id":17,"title":"Unsaid, The","genre":"Crime|Drama|Mystery","description":"Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.","release":"3/7/2022","poster_url":"http://dummyimage.com/159x100.png/cc0000/ffffff"},
{"id":18,"title":"My Flesh and Blood","genre":"Documentary","description":"In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.","release":"4/7/2022","poster_url":"http://dummyimage.com/119x100.png/cc0000/ffffff"},
{"id":19,"title":"Sanctum","genre":"Action|Adventure|Drama|Thriller|IMAX","description":"Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.","release":"12/23/2022","poster_url":"http://dummyimage.com/170x100.png/ff4444/ffffff"},
{"id":20,"title":"To the Shores of Tripoli","genre":"Drama|Romance|War","description":"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.","release":"11/29/2022","poster_url":"http://dummyimage.com/206x100.png/5fa2dd/ffffff"}
]

export default MOCK_DATA;