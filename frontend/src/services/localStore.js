// localStore.js - mock backend with role-based data and permissions
const KEY = 'campushub_library_v2_expanded'

function seed(){
  if (localStorage.getItem(KEY)) return
  
  const books = [
    // Computer Science & Programming (15 books)
    { id: 1, title: 'Introduction to Algorithms', author: 'Cormen et al.', copies: 5, available: 3, year: 2009, isbn: '9780262033848', category: 'Computer Science', section: 'Tech' },
    { id: 2, title: 'Clean Code', author: 'Robert C. Martin', copies: 3, available: 2, year: 2008, isbn: '9780132350884', category: 'Programming', section: 'Tech' },
    { id: 3, title: 'Design Patterns', author: 'Gamma et al.', copies: 2, available: 1, year: 1994, isbn: '9780201633610', category: 'Software Design', section: 'Tech' },
    { id: 4, title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', copies: 3, available: 3, year: 1999, isbn: '9780135957059', category: 'Programming', section: 'Tech' },
    { id: 5, title: 'Code Complete', author: 'Steve McConnell', copies: 2, available: 2, year: 2004, isbn: '9780735619678', category: 'Programming', section: 'Tech' },
    { id: 6, title: 'The C Programming Language', author: 'Kernighan & Ritchie', copies: 4, available: 2, year: 1988, isbn: '9780131103627', category: 'Programming', section: 'Tech' },
    { id: 7, title: 'Python Crash Course', author: 'Eric Matthes', copies: 6, available: 4, year: 2015, isbn: '9781593275952', category: 'Programming', section: 'Tech' },
    { id: 8, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', copies: 3, available: 3, year: 2018, isbn: '9781593279508', category: 'Programming', section: 'Tech' },
    { id: 9, title: 'Data Structures and Algorithms', author: 'Narasimha Karumanchi', copies: 3, available: 2, year: 2016, isbn: '9781504703529', category: 'Computer Science', section: 'Tech' },
    { id: 10, title: 'The Art of Computer Programming', author: 'Donald Knuth', copies: 2, available: 1, year: 1997, isbn: '9780201896831', category: 'Computer Science', section: 'Tech' },
    { id: 11, title: 'Java: The Complete Reference', author: 'Herbert Schildt', copies: 3, available: 3, year: 2018, isbn: '9781260440249', category: 'Programming', section: 'Tech' },
    { id: 12, title: 'Database Design Manual', author: 'C.J. Date', copies: 2, available: 2, year: 2015, isbn: '9781449391423', category: 'Computer Science', section: 'Tech' },
    { id: 13, title: 'Web Development with Node.js', author: 'Mike Cantelon', copies: 3, available: 2, year: 2013, isbn: '9781449398583', category: 'Programming', section: 'Tech' },
    { id: 14, title: 'Machine Learning Basics', author: 'Andrew Ng', copies: 4, available: 3, year: 2017, isbn: '9781491952016', category: 'Computer Science', section: 'Tech' },
    { id: 15, title: 'Artificial Intelligence: A Modern Approach', author: 'Russell & Norvig', copies: 2, available: 1, year: 2009, isbn: '9780136042594', category: 'Computer Science', section: 'Tech' },

    // English Novels & Literature (20 books)
    { id: 16, title: 'Pride and Prejudice', author: 'Jane Austen', copies: 5, available: 3, year: 1813, isbn: '9780141439518', category: 'Classic Novel', section: 'English Literature' },
    { id: 17, title: 'To Kill a Mockingbird', author: 'Harper Lee', copies: 6, available: 4, year: 1960, isbn: '9780061120084', category: 'Novel', section: 'English Literature' },
    { id: 18, title: '1984', author: 'George Orwell', copies: 5, available: 3, year: 1949, isbn: '9780451524935', category: 'Dystopian Novel', section: 'English Literature' },
    { id: 19, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', copies: 5, available: 4, year: 1925, isbn: '9780743273565', category: 'Classic Novel', section: 'English Literature' },
    { id: 20, title: 'Jane Eyre', author: 'Charlotte Brontë', copies: 4, available: 2, year: 1847, isbn: '9780141441146', category: 'Classic Novel', section: 'English Literature' },
    { id: 21, title: 'The Catcher in the Rye', author: 'J.D. Salinger', copies: 4, available: 3, year: 1951, isbn: '9780316769174', category: 'Novel', section: 'English Literature' },
    { id: 22, title: 'Wuthering Heights', author: 'Emily Brontë', copies: 3, available: 2, year: 1847, isbn: '9780141441123', category: 'Classic Novel', section: 'English Literature' },
    { id: 23, title: 'Moby Dick', author: 'Herman Melville', copies: 3, available: 2, year: 1851, isbn: '9780142437247', category: 'Classic Novel', section: 'English Literature' },
    { id: 24, title: 'The Hobbit', author: 'J.R.R. Tolkien', copies: 6, available: 4, year: 1937, isbn: '9780547928227', category: 'Fantasy Novel', section: 'English Literature' },
    { id: 25, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', copies: 8, available: 5, year: 1997, isbn: '9780439708180', category: 'Fantasy Novel', section: 'English Literature' },
    { id: 26, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', copies: 4, available: 2, year: 1954, isbn: '9780544003415', category: 'Fantasy Novel', section: 'English Literature' },
    { id: 27, title: 'Sherlock Holmes Complete Collection', author: 'Arthur Conan Doyle', copies: 3, available: 2, year: 2015, isbn: '9780199232239', category: 'Mystery', section: 'English Literature' },
    { id: 28, title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', copies: 4, available: 3, year: 1844, isbn: '9780143039990', category: 'Adventure Novel', section: 'English Literature' },
    { id: 29, title: 'Treasure Island', author: 'Robert Louis Stevenson', copies: 3, available: 2, year: 1882, isbn: '9780141439655', category: 'Adventure Novel', section: 'English Literature' },
    { id: 30, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', copies: 3, available: 2, year: 1890, isbn: '9780486278483', category: 'Classic Novel', section: 'English Literature' },
    { id: 31, title: 'Frankenstein', author: 'Mary Shelley', copies: 3, available: 2, year: 1818, isbn: '9780486272474', category: 'Science Fiction', section: 'English Literature' },
    { id: 32, title: 'Dune', author: 'Frank Herbert', copies: 4, available: 3, year: 1965, isbn: '9780441172719', category: 'Science Fiction', section: 'English Literature' },
    { id: 33, title: 'The Chronicles of Narnia', author: 'C.S. Lewis', copies: 5, available: 3, year: 1950, isbn: '9780066238501', category: 'Fantasy Novel', section: 'English Literature' },
    { id: 34, title: 'A Tale of Two Cities', author: 'Charles Dickens', copies: 3, available: 2, year: 1859, isbn: '9780141439600', category: 'Classic Novel', section: 'English Literature' },
    { id: 35, title: 'The Odyssey', author: 'Homer', copies: 2, available: 1, year: 2003, isbn: '9780140268867', category: 'Classic Epic', section: 'English Literature' },

    // Manga & Comics (20 books)
    { id: 36, title: 'Naruto Volume 1', author: 'Masashi Kishimoto', copies: 5, available: 3, year: 1999, isbn: '9781569319009', category: 'Manga', section: 'Manga & Comics' },
    { id: 37, title: 'Dragon Ball Volume 1', author: 'Akira Toriyama', copies: 4, available: 2, year: 1985, isbn: '9781569319000', category: 'Manga', section: 'Manga & Comics' },
    { id: 38, title: 'One Piece Volume 1', author: 'Eiichiro Oda', copies: 6, available: 4, year: 1997, isbn: '9781569319016', category: 'Manga', section: 'Manga & Comics' },
    { id: 39, title: 'Attack on Titan Volume 1', author: 'Hajime Isayama', copies: 5, available: 3, year: 2009, isbn: '9781632360700', category: 'Manga', section: 'Manga & Comics' },
    { id: 40, title: 'Tokyo Ghoul Volume 1', author: 'Sui Ishida', copies: 4, available: 2, year: 2011, isbn: '9781632360762', category: 'Manga', section: 'Manga & Comics' },
    { id: 41, title: 'My Hero Academia Volume 1', author: 'Kohei Horikoshi', copies: 5, available: 3, year: 2014, isbn: '9781632364609', category: 'Manga', section: 'Manga & Comics' },
    { id: 42, title: 'Demon Slayer Volume 1', author: 'Koyoharu Gotouge', copies: 6, available: 4, year: 2016, isbn: '9781974701742', category: 'Manga', section: 'Manga & Comics' },
    { id: 43, title: 'Death Note Volume 1', author: 'Tsugumi Ohba', copies: 4, available: 3, year: 2003, isbn: '9781569319024', category: 'Manga', section: 'Manga & Comics' },
    { id: 44, title: 'Fullmetal Alchemist Volume 1', author: 'Hiromu Arakawa', copies: 4, available: 2, year: 2001, isbn: '9780759528581', category: 'Manga', section: 'Manga & Comics' },
    { id: 45, title: 'Bleach Volume 1', author: 'Tite Kubo', copies: 4, available: 2, year: 2001, isbn: '9781569319000', category: 'Manga', section: 'Manga & Comics' },
    { id: 46, title: 'Hunter x Hunter Volume 1', author: 'Yoshihiro Togashi', copies: 3, available: 2, year: 1998, isbn: '9781569319000', category: 'Manga', section: 'Manga & Comics' },
    { id: 47, title: 'Steins;Gate', author: 'Hiyokichi Shoji', copies: 3, available: 2, year: 2009, isbn: '9780316132595', category: 'Manga', section: 'Manga & Comics' },
    { id: 48, title: 'Jujutsu Kaisen Volume 1', author: 'Gege Akutami', copies: 5, available: 3, year: 2018, isbn: '9781974711574', category: 'Manga', section: 'Manga & Comics' },
    { id: 49, title: 'Chainsaw Man Volume 1', author: 'Tatsuki Fujimoto', copies: 4, available: 2, year: 2018, isbn: '9781974717546', category: 'Manga', section: 'Manga & Comics' },
    { id: 50, title: 'Vinland Saga Volume 1', author: 'Makoto Yukimura', copies: 3, available: 2, year: 2005, isbn: '9781591223955', category: 'Manga', section: 'Manga & Comics' },
    { id: 51, title: 'Berserk Volume 1', author: 'Kentaro Miura', copies: 3, available: 2, year: 1989, isbn: '9781569319001', category: 'Manga', section: 'Manga & Comics' },
    { id: 52, title: 'Ergo Proxy', author: 'Atsuko Asano', copies: 2, available: 1, year: 2006, isbn: '9781569319000', category: 'Manga', section: 'Manga & Comics' },
    { id: 53, title: 'Cowboy Bebop', author: 'Hajime Yatate', copies: 3, available: 2, year: 1998, isbn: '9780679004769', category: 'Manga', section: 'Manga & Comics' },
    { id: 54, title: 'Code Geass Volume 1', author: 'Ichiro Okouchi', copies: 3, available: 2, year: 2006, isbn: '9780192737341', category: 'Manga', section: 'Manga & Comics' },
    { id: 55, title: 'Psycho-Pass Volume 1', author: 'Katsuyuki Motohiro', copies: 2, available: 1, year: 2012, isbn: '9781569319000', category: 'Manga', section: 'Manga & Comics' },

    // Urdu Books (15 books)
    { id: 56, title: 'داغِ بیخودی', author: 'علامہ اقبال', copies: 3, available: 2, year: 1951, isbn: '9786036840485', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 57, title: 'آرزو', author: 'ہاجی ملا علی رام', copies: 2, available: 1, year: 1855, isbn: '9786035934985', category: 'اردو ادب', section: 'Urdu Books' },
    { id: 58, title: 'علامہ اقبال کی شاعری', author: 'علامہ اقبال', copies: 3, available: 2, year: 1956, isbn: '9786036840492', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 59, title: 'ہالی کا مقدمہ', author: 'سید احمد خان', copies: 2, available: 1, year: 1893, isbn: '9786035934950', category: 'اردو نقد', section: 'Urdu Books' },
    { id: 60, title: 'غازیوں کی داستانیں', author: 'ہارون خالد', copies: 3, available: 2, year: 2008, isbn: '9788177352009', category: 'اردو داستان', section: 'Urdu Books' },
    { id: 61, title: 'عمارتِ لالہ', author: 'کرشن چندر', copies: 2, available: 1, year: 1985, isbn: '9788192090702', category: 'اردو ناول', section: 'Urdu Books' },
    { id: 62, title: 'تنہائی', author: 'منٹو انتظار حسین', copies: 2, available: 1, year: 1990, isbn: '9788192090009', category: 'اردو افسانہ', section: 'Urdu Books' },
    { id: 63, title: 'میری محبوب', author: 'رشید جہاں', copies: 2, available: 1, year: 2005, isbn: '9789810090029', category: 'اردو ناول', section: 'Urdu Books' },
    { id: 64, title: 'کوئی ایک ہے', author: 'انجم محمد', copies: 2, available: 1, year: 1982, isbn: '9786035932013', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 65, title: 'سرسری نظریں', author: 'خواجہ حسن علی', copies: 2, available: 1, year: 1988, isbn: '9786036840478', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 66, title: 'غلطی کے نقطے', author: 'شہاب الدین', copies: 2, available: 1, year: 1992, isbn: '9788192090703', category: 'اردو افسانہ', section: 'Urdu Books' },
    { id: 67, title: 'زہرِ ہجر', author: 'منصور الحسن', copies: 2, available: 1, year: 1999, isbn: '9786035934972', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 68, title: 'فردوس', author: 'فردوس احمد', copies: 2, available: 1, year: 2003, isbn: '9788177352016', category: 'اردو ناول', section: 'Urdu Books' },
    { id: 69, title: 'شمالی ستارے', author: 'علی سردار جعفری', copies: 2, available: 1, year: 1987, isbn: '9786036840401', category: 'اردو شاعری', section: 'Urdu Books' },
    { id: 70, title: 'کہانیوں کا خزانہ', author: 'خواجہ حسن علی', copies: 3, available: 2, year: 1995, isbn: '9788192090708', category: 'اردو افسانہ', section: 'Urdu Books' },

    // Science & Scientific Research (15 books)
    { id: 71, title: 'A Brief History of Time', author: 'Stephen Hawking', copies: 5, available: 3, year: 1988, isbn: '9780553380163', category: 'Physics', section: 'Science' },
    { id: 72, title: 'The Selfish Gene', author: 'Richard Dawkins', copies: 4, available: 2, year: 1976, isbn: '9780199291151', category: 'Biology', section: 'Science' },
    { id: 73, title: 'Cosmos', author: 'Carl Sagan', copies: 3, available: 2, year: 1980, isbn: '9780394535684', category: 'Astronomy', section: 'Science' },
    { id: 74, title: 'The Elegant Universe', author: 'Brian Greene', copies: 3, available: 2, year: 1999, isbn: '9780393046883', category: 'Physics', section: 'Science' },
    { id: 75, title: 'Sapiens', author: 'Yuval Noah Harari', copies: 6, available: 4, year: 2011, isbn: '9780062316097', category: 'Anthropology', section: 'Science' },
    { id: 76, title: 'Guns, Germs, and Steel', author: 'Jared Diamond', copies: 4, available: 2, year: 1997, isbn: '9780393317558', category: 'Anthropology', section: 'Science' },
    { id: 77, title: 'The Double Helix', author: 'James Watson', copies: 3, available: 2, year: 1968, isbn: '9780553213010', category: 'Biology', section: 'Science' },
    { id: 78, title: 'On the Origin of Species', author: 'Charles Darwin', copies: 3, available: 2, year: 1859, isbn: '9780143039395', category: 'Biology', section: 'Science' },
    { id: 79, title: 'The Structure of Scientific Revolutions', author: 'Thomas Kuhn', copies: 2, available: 1, year: 1962, isbn: '9780226458113', category: 'Philosophy of Science', section: 'Science' },
    { id: 80, title: 'A Brief History of Artificial Intelligence', author: 'Michael Wooldridge', copies: 3, available: 2, year: 2020, isbn: '9780374175619', category: 'AI', section: 'Science' },
    { id: 81, title: 'Quantum Mechanics', author: 'Leonard Susskind', copies: 2, available: 1, year: 2014, isbn: '9780374533404', category: 'Physics', section: 'Science' },
    { id: 82, title: 'The Fabric of the Cosmos', author: 'Brian Greene', copies: 3, available: 2, year: 2004, isbn: '9780375419065', category: 'Physics', section: 'Science' },
    { id: 83, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', copies: 5, available: 3, year: 2011, isbn: '9780374533557', category: 'Psychology', section: 'Science' },
    { id: 84, title: 'The Evolution of Cooperation', author: 'Robert Axelrod', copies: 2, available: 1, year: 1984, isbn: '9780465005642', category: 'Biology', section: 'Science' },
    { id: 85, title: 'Life at the Limits', author: 'David Waltham', copies: 2, available: 1, year: 2002, isbn: '9780674009509', category: 'Biology', section: 'Science' },

    // Novels & Fiction (15 more)
    { id: 86, title: 'The Midnight Library', author: 'Matt Haig', copies: 4, available: 3, year: 2020, isbn: '9780525559474', category: 'Contemporary Fiction', section: 'Novels' },
    { id: 87, title: 'Educated', author: 'Tara Westover', copies: 5, available: 3, year: 2018, isbn: '9780399590504', category: 'Memoir', section: 'Novels' },
    { id: 88, title: 'The Book Thief', author: 'Markus Zusak', copies: 4, available: 2, year: 2005, isbn: '9780375831003', category: 'Historical Fiction', section: 'Novels' },
    { id: 89, title: 'All the Light We Cannot See', author: 'Anthony Doerr', copies: 4, available: 2, year: 2014, isbn: '9781410469007', category: 'Historical Fiction', section: 'Novels' },
    { id: 90, title: 'The Nightingale', author: 'Kristin Hannah', copies: 4, available: 2, year: 2015, isbn: '9780312577223', category: 'Historical Fiction', section: 'Novels' },
    { id: 91, title: 'Where the Crawdads Sing', author: 'Delia Owens', copies: 5, available: 3, year: 2018, isbn: '9780735219090', category: 'Mystery Fiction', section: 'Novels' },
    { id: 92, title: 'The Woman in Cabin 10', author: 'Ruth Ware', copies: 3, available: 2, year: 2016, isbn: '9780735212046', category: 'Thriller', section: 'Novels' },
    { id: 93, title: 'Before We Were Yours', author: 'Lisa Wingate', copies: 3, available: 2, year: 2017, isbn: '9780345476708', category: 'Historical Fiction', section: 'Novels' },
    { id: 94, title: 'The Alice Network', author: 'Kate Quinn', copies: 3, available: 2, year: 2013, isbn: '9780062195661', category: 'Historical Fiction', section: 'Novels' },
    { id: 95, title: 'The Rosie Project', author: 'Graeme Simsion', copies: 3, available: 2, year: 2013, isbn: '9781492206682', category: 'Romance', section: 'Novels' },
    { id: 96, title: 'It Ends with Us', author: 'Colleen Hoover', copies: 5, available: 3, year: 2016, isbn: '9781492208662', category: 'Romance', section: 'Novels' },
    { id: 97, title: 'The Seven Husbands of Evelyn Hugo', author: 'Taylor Jenkins Reid', copies: 5, available: 3, year: 2017, isbn: '9781492219515', category: 'Historical Fiction', section: 'Novels' },
    { id: 98, title: 'Circe', author: 'Madeline Miller', copies: 4, available: 2, year: 2018, isbn: '9780316556347', category: 'Mythology', section: 'Novels' },
    { id: 99, title: 'The Song of Achilles', author: 'Madeline Miller', copies: 4, available: 2, year: 2011, isbn: '9780061895326', category: 'Mythology', section: 'Novels' },
    { id: 100, title: 'Hamnet', author: 'Maggie O\'Farrell', copies: 3, available: 2, year: 2020, isbn: '9780385545142', category: 'Historical Fiction', section: 'Novels' }
  ]
  
  // If we want a larger catalog, auto-generate additional books until we reach 1000
  (function generateMoreBooks(){
    const target = 1000
    let nextId = books.length + 1
    // Map nicer covers for key known titles using Unsplash featured queries
    const coverMap = {
      'introduction to algorithms': 'https://source.unsplash.com/featured/?algorithms,book',
      'clean code': 'https://source.unsplash.com/featured/?code,programming,book',
      'design patterns': 'https://source.unsplash.com/featured/?design,patterns,book',
      'the pragmatic programmer': 'https://source.unsplash.com/featured/?programming,developer,book',
      'code complete': 'https://source.unsplash.com/featured/?software,engineering,book',
      'python crash course': 'https://source.unsplash.com/featured/?python,programming,book',
      'eloquent javascript': 'https://source.unsplash.com/featured/?javascript,programming,book',
      "harry potter and the philosopher's stone": 'https://source.unsplash.com/featured/?fantasy,magic,book',
      'the hobbit': 'https://source.unsplash.com/featured/?fantasy,hobbit,book',
      'the lord of the rings': 'https://source.unsplash.com/featured/?lord,of,the,rings,book',
      'pride and prejudice': 'https://source.unsplash.com/featured/?pride,prejudice,book',
      'to kill a mockingbird': 'https://source.unsplash.com/featured/?mockingbird,classic,book',
      '1984': 'https://source.unsplash.com/featured/?dystopia,1984,book',
      'dune': 'https://source.unsplash.com/featured/?dune,sciencefiction,book',
      'a brief history of time': 'https://source.unsplash.com/featured/?time,science,book',
      'sapiens': 'https://source.unsplash.com/featured/?history,anthropology,book'
    }
    const sectionsSamples = {
      'Tech': [
        'Advanced Algorithms', 'Practical DevOps', 'Systems Programming', 'Cloud Native Patterns',
        'Modern C++ in Practice', 'Functional Programming in JS', 'Secure Coding Practices'
      ],
      'English Literature': [
        'Modern Short Stories', 'Great British Poems', 'Contemporary Plays', 'Literary Criticism'
      ],
      'Manga & Comics': [
        'Slice of Life Collection', 'Superhero Omnibus', 'Classic Manga Anthology', 'Shojo Stories'
      ],
      'Urdu Books': [
        'ادبی معاشرت', 'روایتی کہانیاں', 'جدید شاعری', 'نثری مضامین'
      ],
      'Science': [
        'Applied Mathematics', 'Environmental Science', 'Neuroscience Today', 'Materials Science Overview'
      ],
      'Novels': [
        'Contemporary Mystery', 'Literary Romance', 'Postcolonial Voices', 'Adventure Tales'
      ],
      'Business & Self-Help': [
        'Principles of Management', 'Lean Startup Guide', 'Effective Leadership', 'Personal Productivity'
      ],
      'History & Biography': [
        'World War II Chronicles', 'Leaders of the 20th Century', 'Ancient Civilizations', 'Explorers and Expeditions'
      ],
      'Children & Young Adult': [
        'Bedtime Tales', 'Young Hero Series', 'STEM for Kids', 'Illustrated Fairytales'
      ]
    }

    const sectionKeys = Object.keys(sectionsSamples)

    while (books.length < target) {
      const sec = sectionKeys[(books.length) % sectionKeys.length]
      const samples = sectionsSamples[sec]
      const idx = (books.length) % samples.length
      const titleBase = samples[idx]
      const title = `${titleBase} - Vol ${Math.floor(books.length/10)+1}`
      const author = sec === 'Urdu Books' ? 'مختلف مصنفین' : `Author ${Math.floor(Math.random()*300)+1}`
      const copies = 2 + (books.length % 5)
      const available = Math.max(0, copies - (Math.floor(Math.random()*2)))
      const year = 1980 + (books.length % 45)
      const isbn = `GEN-${nextId.toString().padStart(6,'0')}`
      // Prefer mapped nicer covers for known titles
      const normalizedTitle = (title || '').toLowerCase()
      const mapped = Object.keys(coverMap).find(k => normalizedTitle.includes(k))
      const coverUrl = mapped ? coverMap[mapped] : `https://picsum.photos/seed/book${nextId}/300/420`
      books.push({ id: nextId, title, author, copies, available, year, isbn, category: sec, section: sec, coverUrl })
      nextId += 1
    }
  })()
  // Ensure every book has a coverUrl (use placeholder if missing)
  books.forEach(b => {
    if (!b.coverUrl) b.coverUrl = `https://picsum.photos/seed/book${b.id}/300/420`
  })
  const users = [
    { id: 1, name: 'Admin User', role: 'admin', username: 'admin', password: 'admin123', email: 'admin@campushub.edu' },
    { id: 2, name: 'Dr. Emily Johnson', role: 'teacher', username: 'teacher1', password: 'teacher123', email: 'emily@campushub.edu', department: 'Computer Science' },
    { id: 3, name: 'Prof. David Smith', role: 'teacher', username: 'teacher2', password: 'teacher123', email: 'david@campushub.edu', department: 'Engineering' },
    { id: 4, name: 'Alice Cooper', role: 'student', username: 'alice', password: 'alice123', email: 'alice@student.campushub.edu', enrollment: 'CS101' },
    { id: 5, name: 'Bob Johnson', role: 'student', username: 'bob', password: 'bob123', email: 'bob@student.campushub.edu', enrollment: 'CS102' }
  ]
  
  const borrowings = [
    { id: 1, bookId: 1, userId: 4, dateBorrowed: new Date(Date.now()-86400000).toISOString(), returned: false },
    { id: 2, bookId: 2, userId: 5, dateBorrowed: new Date(Date.now()-172800000).toISOString(), returned: false },
    { id: 3, bookId: 36, userId: 4, dateBorrowed: new Date(Date.now()-259200000).toISOString(), returned: false },
    { id: 4, bookId: 56, userId: 2, dateBorrowed: new Date(Date.now()-345600000).toISOString(), returned: false }
  ]
  
  const store = { books, users, borrowings, nextBookId: books.length + 1, nextUserId: 6, nextBorrowId: 5 }
  localStorage.setItem(KEY, JSON.stringify(store))
}

function read(){ seed(); return JSON.parse(localStorage.getItem(KEY)) }
function write(store){ localStorage.setItem(KEY, JSON.stringify(store)) }

export default {
  listBooks({ page=1, perPage=10, q='' }={}){
    const s = read()
    let arr = s.books.slice()
    if (q) {
      const ql = q.toLowerCase()
      arr = arr.filter(b => b.title.toLowerCase().includes(ql) || b.author.toLowerCase().includes(ql) || (b.isbn||'').includes(ql))
    }
    const total = arr.length
    const start = (page-1)*perPage
    return { items: arr.slice(start, start+perPage), total }
  },
  getBook(id){
    const s = read()
    return s.books.find(b => b.id === Number(id)) || null
  },
  createBook(data){
    const s = read()
    const book = { id: s.nextBookId++, ...data }
    s.books.push(book)
    write(s)
    return book
  },
  updateBook(id, data){
    const s = read()
    const idx = s.books.findIndex(b => b.id === Number(id))
    if (idx === -1) return null
    s.books[idx] = { ...s.books[idx], ...data }
    write(s)
    return s.books[idx]
  },
  deleteBook(id){
    const s = read()
    s.books = s.books.filter(b => b.id !== Number(id))
    write(s)
    return true
  },
  borrowBook(bookId, userId){
    const s = read()
    const book = s.books.find(b => b.id === Number(bookId))
    if (!book || book.available <= 0) return { ok: false, msg: 'Not available' }
    book.available -= 1
    const borrowedAt = new Date()
    const dueAt = new Date(borrowedAt.getTime() + 14 * 24 * 60 * 60 * 1000) // 14 days
    const borrow = { id: s.nextBorrowId++, bookId: book.id, userId, dateBorrowed: borrowedAt.toISOString(), dateDue: dueAt.toISOString(), dateReturned: null, returned: false, fineAmount: 0 }
    s.borrowings.push(borrow)
    write(s)
    return { ok: true, borrow }
  },
  returnBook(borrowId, requestingUserId){
    const s = read()
    const b = s.borrowings.find(x => x.id === Number(borrowId))
    if (!b || b.returned) return { ok: false, msg: 'Invalid borrowing' }
    // Only the borrower may return
    if (b.userId !== Number(requestingUserId)) return { ok: false, msg: 'only the borrower can return this book' }
    const returnedAt = new Date()
    b.returned = true
    b.dateReturned = returnedAt.toISOString()
    // calculate fine: 100 rupees per full overdue day
    let fine = 0
    if (b.dateDue){
      const due = new Date(b.dateDue)
      const daysOverdue = Math.max(0, Math.ceil((returnedAt - due) / (24*60*60*1000)))
      if (daysOverdue > 0) fine = daysOverdue * 100
    }
    b.fineAmount = fine
    const book = s.books.find(x => x.id === b.bookId)
    if (book) book.available += 1
    write(s)
    return { ok: true, fine, borrow: b }
  },
  listBorrowings(userId=null, userRole=null){
    const s = read()
    let items = s.borrowings.map(b => ({...b, book: s.books.find(x=>x.id===b.bookId), user: s.users.find(u=>u.id===b.userId)}))
    if (userRole === 'student' && userId) items = items.filter(b => b.userId === userId)
    return items
  },
  listUsers(){ return read().users.slice() },
  getUserById(id){ return read().users.find(u => u.id === Number(id)) || null },
  findUserByUsername(username){ return read().users.find(u => u.username === username) || null },
  createUser({ username, password, name, role='student' }){
    const s = read()
    if (s.users.find(u => u.username === username)) return { ok:false, msg:'username exists' }
    // Enforce maximum admin accounts in local mock as well
    if (role === 'admin'){
      const adminCount = s.users.filter(u => u.role === 'admin').length
      if (adminCount >= 4) return { ok:false, msg: 'maximum number of admin accounts reached (4)' }
    }
    const user = { id: s.nextUserId++, username, password, name: name || username, role }
    s.users.push(user)
    write(s)
    return { ok:true, user }
  },
  updateUser(userId, data){
    const s = read()
    const u = s.users.find(x => x.id === Number(userId))
    if (!u) return { ok:false, msg:'User not found' }
    Object.assign(u, data)
    write(s)
    return { ok:true, user: u }
  },
  changePassword(userId, newPassword){
    const s = read()
    const u = s.users.find(x => x.id === Number(userId))
    if (!u) return { ok:false, msg:'User not found' }
    u.password = newPassword
    write(s)
    return { ok:true }
  },
  authenticateUser(username, password){
    const u = this.findUserByUsername(username)
    if (!u) return { ok:false, msg:'no such user' }
    if (u.password !== password) return { ok:false, msg:'bad credentials' }
    return { ok:true, user: u }
  },
  getStats(userId, userRole){
    const s = read()
    const totalBooks = s.books.length
    const totalBorrowings = s.borrowings.length
    const activeBorrowings = s.borrowings.filter(b => !b.returned).length
    const totalUsers = s.users.length
    const userBorrowings = s.borrowings.filter(b => b.userId === userId && !b.returned)
    return { totalBooks, totalBorrowings, activeBorrowings, totalUsers, userBorrowings: userBorrowings.length }
  },
  updateUserRole(userId, newRole){
    const s = read()
    const user = s.users.find(u => u.id === Number(userId))
    if (!user) return { ok: false, msg: 'User not found' }
    // Enforce admin cap when promoting
    if (newRole === 'admin' && user.role !== 'admin'){
      const adminCount = s.users.filter(u => u.role === 'admin').length
      if (adminCount >= 4) return { ok:false, msg: 'maximum number of admin accounts reached (4)' }
    }
    user.role = newRole
    write(s)
    return { ok: true, user }
  },
  canBorrow(userRole){ return ['student', 'teacher'].includes(userRole) },
  canManageBooks(userRole){ return userRole === 'admin' },
  canManageUsers(userRole){ return userRole === 'admin' }
}
