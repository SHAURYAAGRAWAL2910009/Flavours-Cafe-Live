import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronRight, Clock3, ExternalLink, Instagram, MapPin, Menu, Phone, Star, Utensils, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const instagramUrl = 'https://www.instagram.com/flavoursofjail/';
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Flavours+Of+Jail+Janki+Nagar+Indore';

const orderProviders = [
  { name: 'Swiggy', eyebrow: 'Delivery', url: 'https://www.swiggy.com/restaurants?query=Flavours%20Of%20Jail%20Indore' },
  { name: 'Zomato', eyebrow: 'Delivery + menu', url: 'https://www.zomato.com/indore/restaurants?query=Flavours%20Of%20Jail' },
  { name: 'District', eyebrow: 'Dining reservations', url: 'https://www.district.in/restaurants' },
];

const menuCategories = ['All', 'Sandwiches', 'Pizza', 'Fries & snacks', 'Drinks', 'Mains', 'Celebrations'];

const dishes = [
  { name: 'Corn Mayo Sandwich', note: 'Creamy corn, pepper, and toasted comfort.', price: '₹67', category: 'Sandwiches', tag: 'Easy favourite', popular: true },
  { name: 'Bahubali Sandwich', note: 'The loaded house legend built for big appetites.', price: '₹147', category: 'Sandwiches', tag: 'Best sandwich in Indore', popular: true },
  { name: 'Indorii Masala Sandwich', note: 'A local masala hit with a proper Indorii kick.', price: '₹77', category: 'Sandwiches', tag: 'Local favourite' },
  { name: 'Veg Cheese Sandwich', note: 'Vegetables, cheese, and golden toasted edges.', price: '₹67', category: 'Sandwiches', tag: 'Vegetarian' },
  { name: 'Corn Cheese Sandwich', note: 'Sweet corn with a warm, cheesy finish.', price: '₹87', category: 'Sandwiches', tag: 'Vegetarian' },
  { name: 'Vegetable Sandwich', note: 'A simple, fresh, and easy-to-love classic.', price: '₹47', category: 'Sandwiches', tag: 'Everyday classic' },
  { name: 'Maxican Nachos Pizza', note: 'A loaded pizza with nacho crunch and café drama.', price: '₹237', category: 'Pizza', tag: 'Loaded favourite', popular: true },
  { name: 'Farm House Pizza', note: 'Garden vegetables, stretchy cheese, big mood.', price: '₹157', category: 'Pizza', tag: 'Best pizza in Indore', popular: true },
  { name: 'Margherita Pizza', note: 'A timeless cheese-and-tomato classic.', price: '₹97', category: 'Pizza', tag: 'Classic' },
  { name: 'Loaded Cheese Pizza', note: 'Extra cheese for when restraint is off the menu.', price: 'Price on request', category: 'Pizza', tag: 'Cheese pull' },
  { name: 'Baked Cheese Fries', note: 'Crisp fries under a blanket of baked cheese.', price: '₹117', category: 'Fries & snacks', tag: 'For the table' },
  { name: 'Cheese Maggi', note: 'Late-night Maggi with a rich cheesy upgrade.', price: '₹117', category: 'Fries & snacks', tag: 'Late-night fix' },
  { name: 'Chai with Roasted Bread', note: 'A warm breakfast-style pairing.', price: '₹27', category: 'Fries & snacks', tag: 'Breakfast' },
  { name: 'Mango Shake', note: 'Thick, fruity, and made for a sunny mood.', price: '₹77', category: 'Drinks', tag: 'Seasonal favourite' },
  { name: 'Strawberry Shake', note: 'Sweet strawberry comfort in a tall glass.', price: '₹67', category: 'Drinks', tag: 'Sweet escape' },
  { name: 'Brownie Shake', note: 'Dessert and drink in one unapologetic pour.', price: '₹137', category: 'Drinks', tag: 'Dessert drink', popular: true },
  { name: 'Orange Mojito', note: 'Citrus sparkle with a fresh, cooling finish.', price: '₹117', category: 'Drinks', tag: 'Refreshing' },
  { name: 'Paan Mojito', note: 'A playful Indian twist on the classic cooler.', price: '₹127', category: 'Drinks', tag: 'House twist' },
  { name: 'Kiwi Cooler Mocktail', note: 'Bright kiwi flavour and a crisp finish.', price: '₹87', category: 'Drinks', tag: 'Refreshing' },
  { name: 'Blackcurrant Mocktail', note: 'Deep berry flavour, served chilled.', price: '₹87', category: 'Drinks', tag: 'Berry hit' },
  { name: 'Sparkling Lemonade', note: 'Clean citrus fizz for an easy reset.', price: '₹57', category: 'Drinks', tag: 'Refreshing' },
  { name: 'Punjabi Tadka Maggi', note: 'The comfort bowl with a little attitude.', price: 'Price on request', category: 'Mains', tag: 'Late-night fix' },
  { name: 'Red Sauce Pasta', note: 'Tomato-rich, comforting, and made to share.', price: 'Price on request', category: 'Mains', tag: 'House classic' },
  { name: 'White Sauce Pasta', note: 'Creamy, rich, and one of the most-mentioned dishes.', price: 'Price on request', category: 'Mains', tag: 'Review favourite' },
  { name: 'Hakka Noodles', note: 'A café staple with a quick wok finish.', price: 'Price on request', category: 'Mains', tag: 'Classic' },
  { name: 'Veg Kothe', note: 'A saucy Indo-Chinese favourite.', price: 'Price on request', category: 'Mains', tag: 'Indo-Chinese' },
  { name: 'Sizzling Brownie', note: 'Hot chocolate drama, served at the table.', price: 'Price on request', category: 'Mains', tag: 'For sharing', popular: true },
  { name: "B'Day Celebration", note: 'A themed birthday setup for the guest of honour.', price: '₹1,500', category: 'Celebrations', tag: 'Birthday package' },
  { name: 'Friends Birthday', note: 'A celebration package built for your whole crew.', price: '₹1,500', category: 'Celebrations', tag: 'Group package' },
];

const drinks = ['Oreo Shake', 'Brownie Shake', 'Bourbon Shake', 'Orange & Paan Mojito'];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeDish, setActiveDish] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState('');
  const visibleDishes = activeCategory === 'All' ? dishes : dishes.filter((dish) => dish.category === activeCategory);
  const selectedDish = visibleDishes[Math.min(activeDish, Math.max(visibleDishes.length - 1, 0))] ?? dishes[0];

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 3200);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setSubmitted(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setActiveDish(0);
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden">
      <div className="bg-[#242d27] px-4 py-2 text-center text-[10px] font-bold uppercase tracking-[.2em] text-[#f7efd9] sm:text-xs">
        Indore&apos;s most talked-about jail time
        <span className="mx-2 text-[#f6a32b]">•</span>
        open till midnight
      </div>

      <header className="absolute left-0 right-0 top-9 z-30 border-b border-white/15 text-[#fff8e9]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-3 text-left" data-testid="button-logo">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#f6a32b] text-[#f6a32b]">
              <span className="font-display text-2xl leading-none">FJ</span>
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-wide">Flavours Of Jail</span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.24em] text-[#f8ca77]">Jail Cafe India</span>
            </span>
          </button>
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[.17em] lg:flex">
            <button onClick={() => scrollTo('menu')} className="transition-colors hover:text-[#f6a32b]" data-testid="button-nav-menu">The menu</button>
            <button onClick={() => scrollTo('story')} className="transition-colors hover:text-[#f6a32b]" data-testid="button-nav-story">The story</button>
            <button onClick={() => scrollTo('parties')} className="transition-colors hover:text-[#f6a32b]" data-testid="button-nav-parties">Parties</button>
            <button onClick={() => scrollTo('visit')} className="transition-colors hover:text-[#f6a32b]" data-testid="button-nav-visit">Find us</button>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <a href="tel:09893997949" className="flex items-center gap-2 px-2 text-xs font-bold" data-testid="link-call-header">
              <Phone size={14} /> 09893 997949
            </a>
            <button onClick={() => setBookingOpen(true)} className="rounded-full bg-[#f6a32b] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#242d27] transition-transform hover:scale-[1.03]" data-testid="button-book-header">Book a table</button>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/30 p-2 lg:hidden" aria-label="Open menu" data-testid="button-mobile-menu">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/15 bg-[#242d27] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-[.15em]">
              <button onClick={() => scrollTo('menu')} className="text-left" data-testid="button-mobile-menu-link">The menu</button>
              <button onClick={() => scrollTo('story')} className="text-left" data-testid="button-mobile-story-link">The story</button>
              <button onClick={() => scrollTo('parties')} className="text-left" data-testid="button-mobile-party-link">Parties</button>
              <button onClick={() => setBookingOpen(true)} className="w-fit rounded-full bg-[#f6a32b] px-5 py-3 text-left text-xs text-[#242d27]" data-testid="button-mobile-book">Book a table</button>
            </div>
          </div>
        )}
      </header>

      <section id="top" className="grain relative min-h-[700px] bg-[#242d27] text-[#fff8e9]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#242d27_0%,rgba(36,45,39,.82)_34%,rgba(36,45,39,.18)_75%)]" />
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/hero-jail-cafe.png')" }} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#242d27] to-transparent" />
        <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-end px-5 pb-20 pt-44 lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <div className="reveal mb-7 flex items-center gap-3 text-[#f6a32b]">
              <span className="h-px w-10 bg-[#f6a32b]" />
              <span className="tracking-caps text-xs font-bold">A cafe with a sentence</span>
            </div>
            <h1 className="reveal reveal-delay-1 max-w-4xl font-display text-[clamp(5rem,14vw,11rem)] leading-[.77] tracking-tight text-[#fff8e9]">
              COME FOR<br /><span className="text-[#f6a32b]">THE FOOD.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-md text-lg leading-relaxed text-[#e5ddca]">
              Stay for the story. A little theatrical, seriously delicious, and made for the group chat.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => setBookingOpen(true)} className="group flex items-center gap-3 rounded-full bg-[#f6a32b] px-6 py-4 text-sm font-bold text-[#242d27] transition-all hover:gap-5" data-testid="button-book-hero">
                Book a table <ArrowUpRight size={17} />
              </button>
              <button onClick={() => scrollTo('menu')} className="flex items-center gap-2 rounded-full border border-[#fff8e9]/45 px-6 py-4 text-sm font-bold text-[#fff8e9] hover:border-[#f6a32b] hover:text-[#f6a32b]" data-testid="button-see-menu-hero">
                See what&apos;s cooking <ChevronRight size={17} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-8 right-5 hidden items-center gap-3 text-xs text-[#e5ddca] lg:flex">
            <span className="h-px w-20 bg-[#f6a32b]" /> scroll to explore
          </div>
        </div>
        <div className="absolute bottom-8 left-5 hidden rotate-[-90deg] origin-left text-[10px] font-bold uppercase tracking-[.3em] text-[#e5ddca]/70 sm:block lg:left-8">Janki Nagar · Indore</div>
      </section>

      <section className="border-b border-[#d7cdb9] bg-[#f1e8d5]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#d7cdb9] md:grid-cols-4">
          <div className="px-5 py-7 text-center sm:px-8">
            <div className="font-display text-4xl text-[#242d27]">4.7 <span className="text-[#f6a32b]">★</span></div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#756e63]">from 7,436 reviews</div>
          </div>
          <div className="border-t border-[#d7cdb9] px-5 py-7 text-center sm:px-8 md:border-t-0">
            <div className="font-display text-4xl text-[#242d27]">₹200–400</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#756e63]">per person</div>
          </div>
          <div className="px-5 py-7 text-center sm:px-8">
            <div className="font-display text-4xl text-[#242d27]">12 AM</div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#756e63]">closing time</div>
          </div>
          <button onClick={() => scrollTo('visit')} className="group border-t border-[#d7cdb9] px-5 py-7 text-center hover:bg-[#e9ddc6] sm:px-8 md:border-t-0" data-testid="button-stat-directions">
            <div className="flex items-center justify-center gap-2 font-display text-3xl text-[#242d27]">AB Road <MapPin size={18} className="text-[#d87512]" /></div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#756e63]">near Holkar College</div>
          </button>
        </div>
      </section>

      <section className="bg-[#f1e8d5] px-5 py-24 lg:px-8 lg:py-32" id="story">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="tracking-caps text-xs font-bold text-[#d87512]">Not your usual night out</p>
            <h2 className="mt-5 max-w-lg font-display text-6xl leading-[.88] text-[#242d27] sm:text-8xl">A TABLE<br /><span className="text-[#d87512]">WITH A PLOT.</span></h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[#756e63]">
              At Flavours Of Jail, the room is part of the recipe. Come through the bars, grab a cell, and let the night get deliciously out of hand. We built the kind of place you tell people about before dessert arrives.
            </p>
            <div className="mt-9 flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#242d27] text-[#f6a32b]"><Utensils size={18} /></div>
              <div><p className="font-grotesk font-bold text-[#242d27]">Playful by design. Serious about flavour.</p><p className="mt-1 text-sm text-[#756e63]">Theatrical surroundings, generous plates.</p></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-5 -top-5 z-10 grid h-24 w-24 rotate-[-8deg] place-items-center rounded-full bg-[#f6a32b] text-center text-[10px] font-bold uppercase leading-tight tracking-[.08em] text-[#242d27] shadow-lg sm:-left-8 sm:-top-8">Jail<br />time<br />well spent</div>
            <div className="aspect-[1.15/1] overflow-hidden rounded-[2rem] rounded-br-[5rem] bg-[#303a32]">
              <img src="/hero-jail-cafe.png" alt="The dramatic jail-themed dining room at Flavours Of Jail" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="absolute -bottom-7 right-5 max-w-[210px] rounded-2xl bg-[#fff8e9] p-5 shadow-xl sm:right-10">
              <div className="mb-3 flex gap-1 text-[#f6a32b]"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div>
              <p className="font-grotesk text-sm font-semibold leading-snug text-[#242d27]">&quot;One of those places you have to show your friends.&quot;</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#8d8170]">— a very happy regular</p>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="relative bg-[#242d27] px-5 py-24 text-[#fff8e9] lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="tracking-caps text-xs font-bold text-[#f6a32b]">The evidence</p>
              <h2 className="mt-4 font-display text-7xl leading-[.85] sm:text-9xl">GOOD<br /><span className="text-[#f6a32b]">BEHAVIOUR</span><br />ENDS HERE.</h2>
            </div>
            <div className="max-w-xs text-sm leading-6 text-[#bdb9aa]">Come hungry. Leave with a new favourite and a camera roll full of proof.</div>
          </div>
          <div className="mt-16 grid gap-7 lg:grid-cols-[1.1fr_.9fr]">
            <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] bg-[#303a32]">
              <img src="/food-spread.png" alt="Signature sandwich, pizza, pasta and shakes on a cafe table" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#242d27] via-transparent to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-4">
                <div><p className="tracking-caps text-[10px] font-bold text-[#f6a32b]">Table 07 / the spread</p><p className="mt-2 font-display text-4xl">The more, the merrier.</p><p className="mt-2 max-w-xs text-sm leading-6 text-[#d8d3c5]">From ₹27 chai to ₹1,500 birthday setups, there is a reason to stay for one more round.</p></div>
                <button onClick={() => setOrderOpen(true)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#f6a32b] text-[#242d27] hover:scale-105" aria-label="Order online" data-testid="button-order-image"><ArrowUpRight size={20} /></button>
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#536157] p-6 sm:p-8">
              <div className="mb-7 flex items-center justify-between border-b border-[#536157] pb-5">
                <span className="font-grotesk text-sm font-bold text-[#bdb9aa]">The full menu</span>
                <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#f6a32b]">{visibleDishes.length} items</span>
              </div>
              <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
                {menuCategories.map((category) => (
                  <button key={category} onClick={() => changeCategory(category)} className={`shrink-0 rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[.09em] transition-colors ${activeCategory === category ? 'border-[#f6a32b] bg-[#f6a32b] text-[#242d27]' : 'border-[#536157] text-[#bdb9aa] hover:border-[#f6a32b] hover:text-[#f6a32b]'}`} data-testid={`button-menu-category-${category.toLowerCase().replace(/\W+/g, '-')}`}>
                    {category}
                  </button>
                ))}
              </div>
              <div className="max-h-[530px] space-y-1 overflow-y-auto pr-2">
                {visibleDishes.map((dish, index) => (
                  <button key={`${dish.name}-${dish.price}-${index}`} onClick={() => setActiveDish(index)} className={`group flex w-full items-center justify-between border-b border-[#536157] py-4 text-left transition-colors ${selectedDish === dish ? 'text-[#f6a32b]' : 'text-[#fff8e9] hover:text-[#f6a32b]'}`} data-testid={`button-dish-${index}`}>
                    <span className="flex min-w-0 items-center gap-3"><span className="font-mono text-[10px] text-[#879185]">{String(index + 1).padStart(2, '0')}</span><span className="min-w-0"><span className="block truncate font-grotesk text-sm font-bold sm:text-base">{dish.name}</span>{dish.popular && <span className="mt-1 block text-[9px] font-bold uppercase tracking-[.13em] text-[#f6a32b]">Popular</span>}</span></span>
                    <span className="ml-3 flex shrink-0 items-center gap-3"><span className="font-mono text-xs text-[#bdb9aa]">{dish.price}</span><ArrowUpRight size={15} className="opacity-0 transition-opacity group-hover:opacity-100" /></span>
                  </button>
                ))}
              </div>
              <div className="mt-7 rounded-xl bg-[#303a32] p-4">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#f6a32b]">{selectedDish.tag}</p><p className="mt-2 text-sm text-[#d8d3c5]">{selectedDish.note}</p></div><span className="font-display text-2xl text-[#f6a32b]">{selectedDish.price}</span></div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => setOrderOpen(true)} className="flex items-center justify-center gap-2 rounded-full bg-[#f6a32b] px-5 py-4 text-sm font-bold text-[#242d27] hover:bg-[#ffc364]" data-testid="button-order-menu">Order online <ExternalLink size={15} /></button><button onClick={() => setBookingOpen(true)} className="flex items-center justify-center gap-2 rounded-full border border-[#536157] px-5 py-4 text-sm font-bold text-[#fff8e9] hover:border-[#f6a32b] hover:text-[#f6a32b]" data-testid="button-reserve-menu">Reserve a table <CalendarDays size={15} /></button></div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#536157] pt-7">
            <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#879185]">Also in the mix</span>
            {drinks.map((drink) => <span key={drink} className="font-grotesk text-sm font-bold text-[#f8ca77]">{drink}</span>)}
          </div>
        </div>
      </section>

      <section id="parties" className="bg-[#d87512] px-5 py-24 text-[#242d27] lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] rounded-tl-[5rem] bg-[#f6a32b]">
              <img src="/party-room.png" alt="Jail-themed private party space decorated for a birthday" className="aspect-[1.05/1] w-full object-cover mix-blend-multiply transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="tracking-caps text-xs font-bold text-[#fff8e9]">Your next alibi</p>
            <h2 className="mt-4 max-w-xl font-display text-7xl leading-[.84] sm:text-9xl">BIRTHDAY<br /><span className="text-[#fff8e9]">BEHIND</span><br />BARS.</h2>
            <p className="mt-7 max-w-md text-base leading-7 text-[#4a2b13]">Specialized party space, free jail-themed decorations, and enough room for your favourite suspects. You bring the people. We&apos;ll make it a proper scene.</p>
             <div className="mt-8 grid max-w-md grid-cols-2 gap-3 border-y border-[#a8530e] py-5 text-sm font-bold">
               <div className="flex items-center gap-2"><span className="text-lg">01</span> Private party space</div>
               <div className="flex items-center gap-2"><span className="text-lg">02</span> Free decorations</div>
               <div className="flex items-center gap-2"><span className="text-lg">03</span> B&apos;Day · ₹1,500</div>
               <div className="flex items-center gap-2"><span className="text-lg">04</span> Friends · ₹1,500</div>
            </div>
            <button onClick={() => setBookingOpen(true)} className="mt-8 flex items-center gap-3 rounded-full bg-[#242d27] px-6 py-4 text-sm font-bold text-[#fff8e9] hover:bg-[#303a32]" data-testid="button-party-book">Plan a party <ArrowUpRight size={17} /></button>
          </div>
        </div>
      </section>

      <section className="bg-[#f1e8d5] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="tracking-caps text-xs font-bold text-[#d87512]">The word on the street</p><h2 className="mt-4 font-display text-7xl leading-[.85] text-[#242d27] sm:text-9xl">NO<br /><span className="text-[#d87512]">SILENT</span><br />DINERS.</h2></div>
            <div className="flex items-center gap-3 pb-2"><span className="font-display text-6xl text-[#242d27]">4.7</span><span className="text-[#f6a32b]">★★★★★</span></div>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              ['“The theme is brilliant, but the food is what keeps you there. Bahubali Sandwich is actually bahubali.”', 'Riya S. · local guide'],
              ['“Booked the party area for my sister. The decorations were free and the photos came out unreal.”', 'Ankit M. · birthday captain'],
              ['“Perfect late-night spot near AB Road. Brownie shake, good music, no rush.”', 'Nandini P. · midnight regular'],
            ].map(([quote, name], index) => (
              <article key={name} className={`lift rounded-2xl p-7 ${index === 1 ? 'bg-[#242d27] text-[#fff8e9]' : 'border border-[#d7cdb9] bg-[#f7efdF]'}`}>
                <div className="mb-12 flex justify-between"><span className="font-display text-5xl text-[#f6a32b]">“</span><span className="text-sm text-[#f6a32b]">★★★★★</span></div>
                <p className="font-grotesk text-lg font-semibold leading-7">{quote}</p>
                <p className={`mt-7 text-[10px] font-bold uppercase tracking-[.15em] ${index === 1 ? 'text-[#a9b2a7]' : 'text-[#8d8170]'}`}>{name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="relative overflow-hidden bg-[#242d27] px-5 py-24 text-[#fff8e9] lg:px-8 lg:py-28">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full border-[35px] border-[#d87512]/40" />
        <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full border-[35px] border-[#f6a32b]/20" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_.8fr]">
            <div><p className="tracking-caps text-xs font-bold text-[#f6a32b]">Your cell is waiting</p><h2 className="mt-4 max-w-3xl font-display text-7xl leading-[.84] sm:text-9xl">SEE YOU<br /><span className="text-[#f6a32b]">INSIDE.</span></h2><p className="mt-7 max-w-md text-[#bdb9aa]">1-2 Shakuntala Complex, AB Road, Near Holkar College, Angad Kapoor Region, Janki Nagar, Indore, Madhya Pradesh 452001</p></div>
            <div className="flex flex-col justify-end gap-4">
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between border-b border-[#536157] py-5 font-grotesk text-lg font-bold hover:text-[#f6a32b]" data-testid="link-directions"><span className="flex items-center gap-3"><MapPin size={19} className="text-[#f6a32b]" /> Get directions</span><ArrowUpRight size={18} /></a>
              <a href="tel:09893997949" className="flex items-center justify-between border-b border-[#536157] py-5 font-grotesk text-lg font-bold hover:text-[#f6a32b]" data-testid="link-call-footer"><span className="flex items-center gap-3"><Phone size={19} className="text-[#f6a32b]" /> 09893 997949</span><ArrowUpRight size={18} /></a>
              <button onClick={() => setBookingOpen(true)} className="mt-3 flex items-center justify-between rounded-full bg-[#f6a32b] px-6 py-4 text-left font-grotesk font-bold text-[#242d27]" data-testid="button-book-footer"><span className="flex items-center gap-3"><CalendarDays size={19} /> Book a table or party</span><ArrowUpRight size={18} /></button>
            </div>
          </div>
           <div className="mt-20 flex flex-col justify-between gap-6 border-t border-[#536157] pt-6 text-xs text-[#879185] sm:flex-row sm:items-center">
             <div className="flex items-center gap-3"><Clock3 size={14} className="text-[#f6a32b]" /> Open today until midnight</div>
             <div className="flex items-center gap-5"><span>© Flavours Of Jail, Indore</span><a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#f6a32b]" data-testid="link-instagram"><Instagram size={15} /> @flavoursofjail</a></div>
          </div>
        </div>
      </section>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#242d27] px-5 py-3 text-sm font-bold text-[#fff8e9] shadow-2xl" data-testid="status-toast">{toast}</div>}

      {bookingOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#242d27]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-[#f1e8d5] p-6 text-[#242d27] shadow-2xl sm:p-9">
            <button onClick={closeBooking} className="absolute right-5 top-5 rounded-full border border-[#d7cdb9] p-2 hover:bg-[#e9ddc6]" aria-label="Close booking form" data-testid="button-close-booking"><X size={18} /></button>
             {!submitted ? <><p className="tracking-caps text-xs font-bold text-[#d87512]">Reserve your cell</p><h2 id="booking-title" className="mt-3 font-display text-6xl leading-[.85]">BOOK THE<br /><span className="text-[#d87512]">GOOD STUFF.</span></h2><p className="mt-4 max-w-sm text-sm leading-6 text-[#756e63]">Choose a date, time, and party size. We&apos;ll call 09893 997949 to confirm your table or celebration.</p>
              <form className="mt-7 space-y-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); notify('Request received. We will call you shortly.'); }} data-testid="form-booking">
                <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="input-booking-name" />
                <input required name="phone" type="tel" placeholder="Phone number" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="input-booking-phone" />
                 <div className="grid gap-3 sm:grid-cols-3"><input required name="date" type="date" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="input-booking-date" /><select required name="time" defaultValue="7:00 PM" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="select-booking-time"><option>6:00 PM</option><option>6:30 PM</option><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option><option>9:00 PM</option></select><select required name="guests" defaultValue="2 guests" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="select-booking-guests"><option>2 guests</option><option>4 guests</option><option>6 guests</option><option>8 guests</option><option>Party / 10+</option></select></div>
                 <select name="occasion" defaultValue="Dinner" className="w-full rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="select-booking-occasion"><option>Dinner</option><option>Birthday celebration</option><option>Friends birthday</option><option>College or group outing</option></select>
                 <textarea name="note" placeholder="Any birthday or party details? (optional)" rows={3} className="w-full resize-none rounded-xl border border-[#d7cdb9] bg-[#fff8e9] px-4 py-3.5 outline-none focus:border-[#d87512]" data-testid="textarea-booking-note" />
                 <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#242d27] py-4 font-bold text-[#fff8e9] hover:bg-[#303a32]" data-testid="button-submit-booking">Send booking request <ArrowUpRight size={16} /></button>
              </form>
               <div className="mt-6 border-t border-[#d7cdb9] pt-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#756e63]">Prefer instant availability?</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{orderProviders.map((provider) => <a key={provider.name} href={provider.url} target="_blank" rel="noreferrer" className="rounded-xl border border-[#d7cdb9] px-3 py-3 text-center hover:border-[#d87512]" data-testid={`link-booking-provider-${provider.name.toLowerCase()}`}><span className="block text-xs font-bold">{provider.name}</span><span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-[#8d8170]">{provider.eyebrow}</span></a>)}</div></div>
            </> : <div className="py-10 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#f6a32b] text-[#242d27]"><Star fill="currentColor" /></div><h2 className="mt-6 font-display text-6xl">YOU&apos;RE<br /><span className="text-[#d87512]">ON THE LIST.</span></h2><p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#756e63]">Thanks. Our crew will call 09893 997949 to confirm the details.</p><button onClick={closeBooking} className="mt-7 rounded-full bg-[#242d27] px-6 py-3 text-sm font-bold text-[#fff8e9]" data-testid="button-done-booking">Done</button></div>}
          </div>
        </div>
      )}

      {orderOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#242d27]/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="order-title">
          <div className="relative w-full max-w-md rounded-[2rem] bg-[#f1e8d5] p-7 text-[#242d27] shadow-2xl sm:p-9">
            <button onClick={() => setOrderOpen(false)} className="absolute right-5 top-5 rounded-full border border-[#d7cdb9] p-2 hover:bg-[#e9ddc6]" aria-label="Close order options" data-testid="button-close-order"><X size={18} /></button>
            <p className="tracking-caps text-xs font-bold text-[#d87512]">Takeout, sorted</p><h2 id="order-title" className="mt-3 font-display text-6xl leading-[.86]">GET IT<br /><span className="text-[#d87512]">DELIVERED.</span></h2><p className="mt-4 text-sm leading-6 text-[#756e63]">Choose a provider for delivery or dining reservations. For the quickest answer, call the café directly.</p>
            <div className="mt-7 space-y-3">{orderProviders.map((provider) => <a key={provider.name} href={provider.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-[#d7cdb9] bg-[#fff8e9] px-5 py-4 hover:border-[#d87512]" data-testid={`link-order-${provider.name.toLowerCase()}`}><span><span className="block font-bold">{provider.name}</span><span className="mt-1 block text-xs text-[#756e63]">{provider.eyebrow}</span></span><ExternalLink size={17} className="text-[#d87512]" /></a>)}</div>
            <a href="tel:09893997949" className="mt-5 flex items-center justify-center gap-3 rounded-full bg-[#242d27] py-4 font-bold text-[#fff8e9]" data-testid="link-order-call"><Phone size={17} /> Call 09893 997949</a>
            <button onClick={() => setOrderOpen(false)} className="mt-3 w-full rounded-full border border-[#242d27] py-4 text-sm font-bold hover:bg-[#e9ddc6]" data-testid="button-order-close">Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;