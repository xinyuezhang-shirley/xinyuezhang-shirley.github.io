import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Image, BookOpen, Music, Instagram, Heart, Play, ExternalLink, X, MessageCircle, Share2, Bookmark, MoreHorizontal, User, Clock } from 'lucide-react';
import BubbleBackground from './BubbleBackground';

interface FriendViewProps {
  onBack: () => void;
}

const FriendView = ({ onBack }: FriendViewProps) => {
  const [activeTab, setActiveTab] = useState('art');
  const [selectedArtwork, setSelectedArtwork] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const artworks = [
    { 
      id: 1, 
      title: 'Surrender', 
      medium: 'Digital Art', 
      image: '/art/goddess.PNG',
      description: 'My first piece in a long time after coming back from Italy.',
      likes: 342,
      comments: 28,
      date: 'August 2024',
      artist: 'myco.to',
      tags: ['#oc', '#whatamidoingwithmylife',],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 2, 
      title: 'Zion - Introduction', 
      medium: 'Digital Art', 
      image: '/art/zion.PNG',
      description: 'One of my OCs: Zion, an apprentice God.',
      likes: 189,
      comments: 15,
      date: 'May 31',
      artist: 'myco.to',
      tags: ['#oc',],
      isLiked: true,
      isSaved: true
    },
    { 
      id: 3, 
      title: 'Ivan', 
      medium: 'Digital Art', 
      image: '/art/ivan.jpg',
      description: 'Fanart for Ivan from Alien Stage',
      likes: 567,
      comments: 42,
      date: 'June 8',
      artist: 'myco.to',
      tags: ['#alienstage', '#alienstageivan',],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 4, 
      title: '郑北x姜小海 Fanart', 
      medium: 'Digital Art', 
      image: '/art/xueMiGong.jpg',
      description: 'My drawing of 郑北x姜小海 fanart for @jackiehe',
      likes: 423,
      comments: 31,
      date: 'July 3',
      artist: 'myco.to',
      tags: ['#雪迷宫',],
      isLiked: true,
      isSaved: false
    },
    { 
      id: 5, 
      title: 'Fear Me', 
      medium: 'Digital Art', 
      image: '/art/light.JPEG',
      description: 'If I cannot inspire love, I will cause feat.',
      likes: 891,
      comments: 67,
      date: 'Jan 26',
      artist: 'myco.to',
      tags: [],
      isLiked: false,
      isSaved: true
    },
    { 
      id: 6, 
      title: 'Love me, Hate me', 
      medium: 'Digital Design', 
      image: '/art/jeonghan.JPEG',
      description: 'Photoshop album design for Seventeen Jeonghan',
      likes: 234,
      comments: 19,
      date: 'March 2023',
      artist: 'myco.to',
      tags: ['#seventeen', '#jeonghan',],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 7, 
      title: 'Describe what you see', 
      medium: 'Digital Design', 
      image: '/art/vernon.JPEG',
      description: 'Photoshop album design for Seventeen Vernon, inspired by Dead Poets Society',
      likes: 156,
      comments: 12,
      date: 'March 2023',
      artist: 'myco.to',
      tags: ['#seventeen', '#vernon','#deadpoetsociety'],
      isLiked: true,
      isSaved: true
    },
    { 
      id: 8, 
      title: 'Commission 1', 
      medium: 'Digital Art', 
      image: '/art/purpleHorn.JPG',
      description: 'Commissioned art I did for online friends Pt. 1',
      likes: 298,
      comments: 24,
      date: 'August 2024',
      artist: 'myco.to',
      tags: ['#oc'],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 9, 
      title: 'Commission 2', 
      medium: 'Digital Art', 
      image: '/art/idol.JPG',
      description: 'Commissioned art I did for online friends Pt. 2',
      likes: 298,
      comments: 24,
      date: 'August 2024',
      artist: 'myco.to',
      tags: [],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 10, 
      title: 'Commission 3', 
      medium: 'Digital Art', 
      image: '/art/fairy.JPG',
      description: 'Commissioned art I did for online friends Pt. 3',
      likes: 298,
      comments: 24,
      date: 'August 2024',
      artist: 'myco.to',
      tags: [],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 11, 
      title: 'Commission 4', 
      medium: 'Digital Art', 
      image: '/art/schoolGirl.JPG',
      description: 'Commissioned art I did for online friends Pt. 4',
      likes: 298,
      comments: 24,
      date: 'August 2024',
      artist: 'myco.to',
      tags: [],
      isLiked: false,
      isSaved: false
    },
    { 
      id: 12,
      title: 'Mycoto',
      medium: 'Digital Art',
      image: '/art/mycoto.JPG',
      description: 'Hi There, I am Mycoto.',
      likes: 298,
      comments: 24,
      date: 'May 10',
      artist: 'myco.to',
      tags: ['#oc'],
      isLiked: false,
      isSaved: false
    }

  ];

  const photographs = [
    { id: 1, title: 'Hello', location: 'Portrait', image: '/photography/hello.JPG', description: '', likes: 220, comments: 20, date: '1 week ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 2, title: 'Dragon Boat', location: 'Event', image: '/photography/dragonBoat.jpg', description: '', likes: 160, comments: 14, date: '2 weeks ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 3, title: 'Characters', location: 'Portrait', image: '/photography/characters.jpg', description: '', likes: 190, comments: 16, date: '3 weeks ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: true },
    { id: 4, title: 'Car Blur', location: 'Urban', image: '/photography/car_blurr.png', description: '', likes: 170, comments: 13, date: '1 month ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 5, title: 'Train', location: 'Urban', image: '/photography/Zhang_train.jpg', description: '', likes: 140, comments: 11, date: '1 month ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 6, title: 'Texture', location: 'Abstract', image: '/photography/Zhang_texture.jpg', description: '', likes: 130, comments: 10, date: '2 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: true },
    { id: 7, title: 'Red Dancers', location: 'Dance', image: '/photography/Zhang_redDancers.jpg', description: '', likes: 250, comments: 22, date: '2 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 8, title: 'Portrait 2', location: 'Portrait', image: '/photography/Zhang_portrait2.jpg', description: '', likes: 200, comments: 18, date: '3 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 9, title: 'Pool Jump', location: 'Action', image: '/photography/Zhang_poolJump-min.png', description: '', likes: 160, comments: 12, date: '3 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 10, title: 'Pepper', location: 'Still Life', image: '/photography/Zhang_pepper.png', description: '', likes: 120, comments: 9, date: '4 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 11, title: 'Deer', location: 'Wildlife', image: '/photography/Zhang_deer.jpg', description: '', likes: 280, comments: 20, date: '4 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 12, title: 'Dance Again', location: 'Dance', image: '/photography/Zhang_danceAgain-min.jpg', description: '', likes: 190, comments: 16, date: '5 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: true },
    { id: 13, title: 'Dance 3', location: 'Dance', image: '/photography/Zhang_dance3.jpg', description: '', likes: 170, comments: 14, date: '5 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 14, title: 'Dance 2', location: 'Dance', image: '/photography/Zhang_dance2.jpg', description: '', likes: 180, comments: 15, date: '6 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: true },
    { id: 15, title: 'Dance', location: 'Dance', image: '/photography/Zhang_dance.jpg', description: '', likes: 200, comments: 17, date: '6 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 16, title: 'Dance 2 Copy', location: 'Dance', image: '/photography/Zhang_dance (2).jpg', description: '', likes: 160, comments: 13, date: '7 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 17, title: 'Butterfly', location: 'Nature', image: '/photography/Zhang_butterfly.jpg', description: '', likes: 240, comments: 19, date: '7 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: true },
    { id: 18, title: 'Bok Choy', location: 'Still Life', image: '/photography/Zhang_bok choy.png', description: '', likes: 110, comments: 8, date: '8 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 19, title: 'Blurry', location: 'Abstract', image: '/photography/Zhang_blurry.jpg', description: '', likes: 130, comments: 10, date: '8 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 20, title: 'We The People', location: 'Portrait', image: '/photography/Zhang_WeThePeople.jpg', description: '', likes: 220, comments: 18, date: '9 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: true },
    { id: 21, title: 'Shiny Beach', location: 'Beach', image: '/photography/Zhang_ShinyBeach-min.png', description: '', likes: 260, comments: 21, date: '9 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 22, title: 'Portal', location: 'Abstract', image: '/photography/Zhang_Portal.jpg', description: '', likes: 180, comments: 15, date: '10 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: true },
    { id: 23, title: 'Molly', location: 'Portrait', image: '/photography/Zhang_Molly.jpg', description: '', likes: 200, comments: 16, date: '10 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 24, title: 'Michelle At Beach', location: 'Beach', image: '/photography/Zhang_MichelleAtBeach-min.png', description: '', likes: 280, comments: 22, date: '11 months ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 25, title: 'Cupcake', location: 'Still Life', image: '/photography/Zhang_Cupcake.png', description: '', likes: 120, comments: 9, date: '11 months ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: true },
    { id: 26, title: 'Coca Cola', location: 'Still Life', image: '/photography/Zhang_CocaCola.jpg', description: '', likes: 100, comments: 7, date: '1 year ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: false },
    { id: 27, title: 'Cabbage', location: 'Still Life', image: '/photography/Zhang_Cabbage.png', description: '', likes: 90, comments: 6, date: '1 year ago', artist: 'myco.to', tags: [], isLiked: false, isSaved: false },
    { id: 28, title: 'Anna', location: 'Portrait', image: '/photography/Zhang_Anna.jpg', description: '', likes: 190, comments: 15, date: '1 year ago', artist: 'myco.to', tags: [], isLiked: true, isSaved: true },
  ];

  const comments = [
    { id: 1, user: 'art_lover_23', text: 'This is absolutely stunning! The colors are so vibrant ✨', time: '1h ago', likes: 12 },
    { id: 2, user: 'creative_soul', text: 'Love the composition and mood you\'ve captured here', time: '2h ago', likes: 8 },
    { id: 3, user: 'designer_mike', text: 'What brushes did you use for this? The texture is amazing!', time: '3h ago', likes: 15 },
    { id: 4, user: 'art_collector', text: 'This would look perfect in my living room! Do you sell prints?', time: '4h ago', likes: 6 },
  ];

  const [expandedPoems, setExpandedPoems] = useState<Set<number>>(new Set());

  const poems = [
    {
      title: 'That Flowers Fall',
      date: 'September 2021',
      content: `Like autumn comes and leaves begin to blush
Like rains confess the wild's restraining souls
Screams the rowdy youth of such fragile rush
Roars untamed minds from London to Seoul

Speak love, speak hate and He may laugh at thee
At crazed and blinded fixations like fame
But though He sings slow ballads to the sea
So does he mourn souls as unruly as Cain

And look, oh look that flowers fall as well
and blushing leaves shower idlers in the fall
Like wind lies, like rain dies, like waves shall swell
Like flowers fall, like me, all things must befall

Does Nature not die certain as shall I?
As Nature is beauty, I am alive.`
    },
    {
      title: 'Poetry',
      date: 'November 2021',
      content: `I've always thought that poetry was
some music for the soul.
It can break you and change you subtly thus,
as a stream caresses its pebbles, as gravity acts on Mars.

I was at that age when the raven knocked
at my chamber door,
and Poetry summoned me forward to decipher
her mysteries, whispered that I take on
the role of a riddler.

As a child, I wrote poetry because
it quelled a rowdy mind
with busy words and fancy diction.
That almost mocked me absurd. Unlearned
and naive that I was
to think that I can measure art
with syntax and rhyme.

How did they do it? Keats or Shakespeare
drew me closer to the music played between
my ears, behind my eyes, and you hear
the sounds of creativity-
deafening, soft, alluring thoughts
presented in the form of Poetry.

I have learned in the years of reading her
that to be a poet is to bribe
the reader with a piece
of your mind, raw and genuine
Not diction, not rhyme
But creativity.

And to hold the title of lead editor
here and there,
writer, though amateur,
fully self-aware
of my insufficiency, indelicacy,
but interest, and affair
with her honor Poetry.

Would it be cliche to say
that she guided me forward.
In the darkest of days, as I lay with her,
I find the strength to pray.

And amateur I was, and amateur I be,
but I find peace under the vastness of the sky
as I listen to her song
of creativity.`
    },
    {
      title: 'The Silent Thief',
      date: 'November 2021',
      content: `To be carried forward by the tide,
the crowd, its ruinous catastrophe,
to play the tune of the curious loss,
the tragic forfeit of identity,
I lose sight of the purpose
of my walk, my ever pacing
reality. Reality?

An echo of myself became myself;
A version of knowledge betrayed knowledge.
On we march to a pure dystopian realm.
Complete thought, semicolon, complete

distraught. Some nihilist reality, that is certain:
bondage through pain, bond by privilege
The plentiful nation of creativity's ruination-
still painfully plain, still dreadfully average.

Some time ago I've learned to suppress
my thoughts, in some unknown corners pressed
between the texts. Stressed, obsessed,
oppressed by his honor Success.
How seductive the concept, how luring the thought?

Reality? Some time ago I lost myself
to the tide, the crowd.
I lost my wealth of power, my voice withheld
from myself. Who am I?

A version of myself shattered myself and was me;
A tale of success replaced success and prevailed.
I have long lost sight of the purpose
of my walk, and yet I walk on
in my ever pacing reality.`
    },
    {
      title: 'Ode to Life',
      date: 'November 2021',
      content: `Epigraph:
"I love that word. Forever. I love that forever doesn't exist, but we have a word for it anyway, and use it all the time. It's beautiful and doomed."- Viv Albertine

Ode to Life
Hear: the soft song plays in the ears of all, that the phantom sound is clear. Like the golden-crowned
sparrow in the depth of fall, the melody rings in heavenly halls, the song: Forever

And God looked upon us with a pitying glance, for he had forever to spare, while men
toiled through their purposeless endeavor, never aware of his Godly thought: Forever

In our depth of agony, our souls can only sense- the doom of the scent so ominous,
the smell of death is near, his marching song, his mare. He charges on. Is death not Forever?

We lie in the coalbed of destiny, blind idiots we are, ripped into living, teared
apart, glued together, gifted pain and glory, is that the solemn song of Forever?

We collect jubilations to better our existence. We withdraw from pain, perpetual
resistance. Revolutionaries against destiny, and the terrors of Forever.

If my name 'joy', meant anything at all, perhaps it will bring me certainty that I shall
live in the tune of the golden-crowned sparrow, not tomorrow, but certainly forever.`
    },
    {
      title: '只身山水 (Alone in the Landscape)',
      date: '2020',
      content: `Yǔ luò jiāng àn mò rén lǚ
雨落江岸没人履
yù yǎn yī cháo xìng huā qīng
欲掩一朝杏花清
mò yūn shānshuǐ shī rén yì
墨晕山水湿人意
lí xià yǐn jiǔ wèn jǐ xīn
篱下饮酒问己心

Translation:
It rains upon the riverbank, wetting shoes of passersby alike
attempting to hide the scent of Apricot blossoms once so prominent
As if ink had spilled over the landscape, it wets feelings as well me
Below the roof one drinks, and a query was made to one's own heart`
    },
    {
      title: 'Romantic Death- Linguistic Tragedy',
      date: 'October 2021',
      content: `That words flow from the tip of my tongue,
Lolita's spell upon me. Each stair case another drawn
Out syllable, dancing, seducing my loss. Romantic.

Tragedy.
I speak not your language. I cannot
Waltz your steps, you curious soul.
I cannot caress the paragraphs like some long lost home,
For every grain of sand marks me foreign
alone in the wilderness, a mournful tone.
You will be the death of me, if not my lover
Each syllable a perfect rhyme with mine
Each sentence a centimeter more somber
Until I lie forever under your spells
Until I forever mistreat you as well. Still,
Your step a little lighter, and I willingly close
my eyes forever.

To live a romantic death, to suffer a beautiful tragedy.
Is this not the beauty of language? To die,
yet live, eternally?`
    },
    {
      title: 'Sleepless',
      date: 'February 2023',
      content: `Sometimes I hear whispers at night
whispers in deep, whispers that cry
for enlightenment of something that might
save them, make them whole again
again, again, again
it comes crashing, like waves on land
Crashing upon the hopeless soul

Sometimes I think I'm losing my mind
I search my thoughts in hope that I find
what it is, where it is, something that might
give me joy again, yet it's elusive,
intrusive, abusive, thoughts fill me in random intervals at night instead
it comes slowly and steadily
like my world has set on fire

On most days I lock the whispers away
lock the flames and screaming
with keys of blissful ignorance, contain
everything in a box named discipline
and wrap my soul inside it tightly, it laughs
in haunting cries of mimicry
I watch the fire burn as it escapes
see my world crash down in subtle ways

at 2 am it escapes it's box
through all the cracks, and I'm awake.`
    },
    {
      title: 'Love is the Language of Strangers',
      date: 'February 2024',
      content: `I'm perplexed. It's as if I've never felt joy
never seen light, never lived or enjoyed
smiles. when I see you smile, boy
my heart drops, not flutter.

The way your eyes twinkle, the way your lips curve
The way your burst into laughter, and your head turns
And your dimples are like wounds, but I'm the victim
Deep, soft, still, they suit you so well

I love you, perhaps, because I've never met you.
it's the distance between unknown, for love is construed
Love is the language of strangers, trust is the language of known
I have never loved you on accident
but will never trust you to hold
My heart in your palms, my soul in your hands

And yet you have them, here, when I see you smile
When I see you smile, I break, when I see you smile I stutter
With imaginary words in imaginary confessions
For imaginary love in imaginary processions

Love is the language of strangers
Strange, foreign ambiguity
I wish i never know you,
But I've never loved you on accident`
    },
    {
      title: 'Happy Birthday',
      date: 'February 2024',
      content: `Count your age from 1 to 20
Look at the primes, the rhyme, the cadence
As if youth is a metaphor for the plenty
Instead of graves of subtle and empty
Remnants of what was. what is -
Eventful if not youth. what is pain if not naïveté.

Or youth is your average symphony.
Rather dramatic- anticlimactic, maybe
Tender, amusive, elusive tones played
In common melodramatic epitomes
Zero in on the message and it seems to evade you
Watch the end and it seems to persuade you
I'm capable of all that I can ever be
Truly, there is no limit to possibilities
Then it ends, "c'est la vie", so it is, so it be
End of sentence, full stop, when youth does not
Really come that easy. Count your age from 1 to infinity

Have it define and refine your memories
Be what it may, lead where it takes, and -
Don't look back. Happy Birthday Claire, enjoy your twenties.`
    },
    {
      title: 'Fear',
      date: 'February 2024',
      content: `In passing, I gaze into the darkness that swallow
I have never understood why some people enjoyed nature

Dark and hollow, empty with artful shadows
Like some graceful, all loving, all forgiving creature

It's depth that's forsworn to be home to humanity
There is no beauty but in power, no love but in fear

All sins are cruel attempts to recreate your glory
For nature will take all that it grants you to bear

Like empty vessels attempting to fill the bottomless void
Living is carnal, painful, and doomed just in trying

You look into the abyss and see what you avoid
You look up at the stars, the dead shines upon the dying

It gazes back, I see myself in the abyss, empty and foreign
Though science claims we are all made of stardust

Nothingness is something- it's God's unloved orphan
In birth we were dying, in death we must trust`
    },
    {
      title: 'The Renaissance Man',
      date: 'July 2024',
      content: `A child leaves marks on the palette of history, a lineage of knowledge, marriage,
privilege to take part of a growing symphony - a movement for him to lead

The apprentice heeds his master, a child his father, a follower his lead.
One by one a proud race of artists plants the seed
that grows for centuries to come.
The Renaissance man.

Master of humanity, master of man
He embraces divinity in the stone and frees it
Be it Architect, artist, chisel in hand
the shepard defeats the giant
"The Giant" forever stands-
tranced in pride and glory, a hero en grande
"What should be said of him cannot be said;
By too great splendor to is his name attended."
Il Divino- Michelangelo Buonarroti

He saw idealism in a tainted world.
Dawn, Dusk, Morning, Night
Giuliano and Lorenzo rests in eternity and plight
woe is the passage of time and destiny
Madonna and child, end our suffering!
Free the vision from the vaulted sky
Free is the hand and Adam's eye

Michelangelo, a man of many faces,
In art and thought, fixing glories of graces
In stone, in frescos, in words, in hand
"The Master" of the Renaissance,
The Renaissance man.`
    }
  ];

  // Sort poems by date (most recent first)
  const sortedPoems = [...poems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Sort artworks by date (most recent first)
  const sortedArtworks = [...artworks].sort((a, b) => {
    // Helper function to parse dates and assume 2025 for dates without year
    const parseDate = (dateStr: string) => {
      if (dateStr.includes('2024') || dateStr.includes('2023')) {
        return new Date(dateStr);
      }
      // For dates without year, assume 2025
      const dateWithYear = dateStr.includes('2025') ? dateStr : `${dateStr} 2025`;
      return new Date(dateWithYear);
    };
    
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const togglePoemExpansion = (index: number) => {
    const newExpanded = new Set(expandedPoems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPoems(newExpanded);
  };

  const tabConfig = [
    { id: 'art', label: 'Art', icon: Image },
    { id: 'photography', label: 'Photography', icon: Image },
    { id: 'poems', label: 'Poems', icon: BookOpen },
  ];

  const quotes = {
    art: "The only people I would care to be with now are artists and people who have suffered: those who know what beauty is, and those who know what sorrow is, nobody else interests me. - Oscar Wilde",
    photography: "'And if beauty is terror,' said Julian, 'then what is desire? We think we have many desires, but in fact we have only one. What is it?''To live,' said Camila. - Donna Tartt, The Secret History",
    poems: "Among other things, you'll find that you're not the first person who was ever confused and frightened and even sickened by human behavior. You're by no means alone on that score, you'll be excited and stimulated to know. Many, many men have been just as troubled morally and spiritually as you are right now. Happily, some of them kept records of their troubles. You'll learn from them—if you want to. Just as someday, if you have something to offer, someone will learn something from you. It's a beautiful reciprocal arrangement. And it isn't education. It's history. It's poetry. - J.D. Salinger, Catcher in the Rye"
  };

  const openModal = (artwork: any) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedArtwork(null), 300);
  };

  const toggleLike = () => {
    if (selectedArtwork) {
      setSelectedArtwork({
        ...selectedArtwork,
        isLiked: !selectedArtwork.isLiked,
        likes: selectedArtwork.isLiked ? selectedArtwork.likes - 1 : selectedArtwork.likes + 1
      });
    }
  };

  const toggleSave = () => {
    if (selectedArtwork) {
      setSelectedArtwork({
        ...selectedArtwork,
        isSaved: !selectedArtwork.isSaved
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'art':
        return (
          <div>
            {/* Quote */}
            <div className="p-6 text-center">
              <p className="text-lg text-gray-600 italic">"{quotes.art}"</p>
            </div>
            {/* Art Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {sortedArtworks.map((artwork) => (
                <motion.div
                  key={artwork.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md aspect-square"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal(artwork)}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <p className="font-semibold">{artwork.title}</p>
                      <p className="text-sm opacity-90">{artwork.medium}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {artwork.isLiked && (
                      <div className="bg-red-500 text-white p-1 rounded-full">
                        <Heart size={12} fill="currentColor" />
                      </div>
                    )}
                    {artwork.isSaved && (
                      <div className="bg-blue-500 text-white p-1 rounded-full">
                        <Bookmark size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'photography':
        return (
          <div>
            {/* Quote */}
            <div className="p-6 text-center">
              <p className="text-lg text-gray-600 italic">"{quotes.photography}"</p>
            </div>
            {/* Photography Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {photographs.map((photo) => (
                <motion.div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md aspect-square"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openModal(photo)}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <p className="font-semibold">{photo.title}</p>
                      <p className="text-sm opacity-90">{photo.location}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    {photo.isLiked && (
                      <div className="bg-red-500 text-white p-1 rounded-full">
                        <Heart size={12} fill="currentColor" />
                      </div>
                    )}
                    {photo.isSaved && (
                      <div className="bg-blue-500 text-white p-1 rounded-full">
                        <Bookmark size={12} fill="currentColor" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'poems':
        return (
          <div>
            {/* Quote */}
            <div className="p-6 text-center">
              <p className="text-lg text-gray-600 italic">"{quotes.poems}"</p>
            </div>
            {/* Poems Content */}
            <div className="p-6 space-y-8">
              {sortedPoems.map((poem, index) => {
                const isExpanded = expandedPoems.has(index);
                const lines = poem.content.split('\n');
                const isLongPoem = lines.length > 8;
                const displayContent = isLongPoem && !isExpanded 
                  ? lines.slice(0, 8).join('\n') + '\n...'
                  : poem.content;

                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => isLongPoem && togglePoemExpansion(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{poem.title}</h3>
                    <span className="text-sm text-gray-500">{poem.date}</span>
                  </div>
                    <motion.div 
                      className="text-gray-700 leading-relaxed whitespace-pre-line"
                      initial={false}
                      animate={{ height: 'auto' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {displayContent}
                </motion.div>
                    {isLongPoem && (
                      <motion.div 
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <button 
                          className="text-pink-500 hover:text-pink-600 font-medium text-sm transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePoemExpansion(index);
                          }}
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );



      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full flex flex-col"
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(125% 125% at -2% 101%, rgba(245, 87, 2, 1) 10.5%, rgba(245, 120, 2, 1) 16%, rgba(245, 140, 2, 1) 17.5%, rgba(245, 170, 100, 1) 25%, rgba(238, 174, 202, 1) 40%, rgba(202, 179, 214, 1) 65%, rgba(148, 201, 233, 1) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <BubbleBackground />
      <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
        {/* Glassmorphic Card Container */}
        <div
          className="relative overflow-hidden shadow-xl w-full h-full flex-1 flex flex-col rounded-2xl"
          style={{
            borderRadius: '20px',
            filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))',
          }}
        >
          {/* White background with overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              pointerEvents: 'none',
            }}
          />
          
          {/* MacOS-style header bar */}
          <div className="relative z-10 flex items-center h-10 px-2 sm:px-4 md:px-6" style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <div className="flex items-center space-x-2 mt-3">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-red-300 shadow" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-200 shadow" />
              <span className="w-3 h-3 rounded-full bg-green-500 border border-green-300 shadow" />
            </div>
          </div>

          {/* Header */}
          <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg border-b border-white border-opacity-20">
            <div className="flex items-center justify-between p-4">
                <button
                  onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">S</span>
                </div>
                <span className="font-semibold text-gray-800">ioakun</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-lg border-b border-white border-opacity-20">
            <div className="flex space-x-8 px-4">
                  {tabConfig.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                        activeTab === tab.id
                  ? 'border-pink-500 text-pink-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                    >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div 
            className="relative z-10 overflow-auto"
            style={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(255,255,255,0.08)',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              minHeight: '40vh',
              maxHeight: '80vh',
            }}
          >
            {/* Content */}
            <div className="pb-10 sm:pb-20">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Floating Social Icons */}
        <div className="fixed bottom-8 right-8 z-50">
          <ul className="example-1">
            <li className="icon-content">
              <div className="tooltip">Instagram</div>
              <a href="https://www.instagram.com/myco.to/" target="_blank" rel="noopener noreferrer" className="link" data-social="instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </li>
            <li className="icon-content">
                <div className="tooltip">Rednote</div>
                <a href="https://www.xiaohongshu.com/user/profile/63043bdf0000000012001a00" target="_blank" rel="noopener noreferrer" className="link" data-social="rednote">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </a>
            </li>
            <li className="icon-content">
              <div className="tooltip">GitHub</div>
              <a href="https://github.com/xinyuezhang-shirley" target="_blank" rel="noopener noreferrer" className="link" data-social="github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </li>
            <li className="icon-content">
              <div className="tooltip">LinkedIn</div>
              <a href="https://www.linkedin.com/in/xinyue-zhang-2292b225b/" target="_blank" rel="noopener noreferrer" className="link" data-social="linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* CSS for Floating Social Icons */}
        <style>{`
          ul {
            list-style: none;
          }

          .example-1 {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bolder;
            background-color: #000;
            border-radius: 30px;
            padding: 20px;
            height: 70px;
            width: 300px;
          }

          .example-1 .icon-content {
            margin: 0 10px;
            position: relative;
            font-weight: bolder;
          }

          .example-1 .icon-content .tooltip {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            color: #000;
            padding: 6px 10px;
            border-radius: 5px;
            opacity: 0;
            visibility: hidden;
            font-size: 14px;
            transition: all 0.3s ease;
            font-weight: bolder;
          }

          .example-1 .icon-content:hover .tooltip {
            opacity: 1;
            visibility: visible;
            top: -50px;
          }

          .example-1 .icon-content .link {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: #fff;
            background-color: #000;
            transition: all 0.3s ease-in-out;
            font-weight: bolder;
          }

          .example-1 .icon-content .link:hover {
            box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
          }

          .example-1 .icon-content .link svg {
            width: 30px;
            height: 30px;
            fill: #fff;
          }

          .example-1 .icon-content .link[data-social="instagram"]:hover {
            color: #e4405f;
          }

          .example-1 .icon-content .link[data-social="rednote"]:hover {
            color: #fe2c55;
          }

          .example-1 .icon-content .link[data-social="github"]:hover {
            color: #333;
          }

          .example-1 .icon-content .link[data-social="linkedin"]:hover {
            color: #0077b5;
          }
        `}</style>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedArtwork.artist}</p>
                      <p className="text-sm text-gray-500">{selectedArtwork.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal Image */}
                <div className="relative">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full h-auto"
                  />
                </div>

                {/* Modal Actions */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={toggleLike}
                        className={`flex items-center space-x-1 transition-colors ${
                          selectedArtwork.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart size={24} fill={selectedArtwork.isLiked ? 'currentColor' : 'none'} />
                        <span className="font-medium">{selectedArtwork.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors">
                        <MessageCircle size={24} />
                        <span className="font-medium">{selectedArtwork.comments}</span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Share2 size={24} />
                      </button>
                    </div>
                    <button
                      onClick={toggleSave}
                      className={`transition-colors ${
                        selectedArtwork.isSaved ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
                      }`}
                    >
                      <Bookmark size={24} fill={selectedArtwork.isSaved ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedArtwork.title}</h2>
                  <p className="text-gray-600 mb-3">{selectedArtwork.medium}</p>
                  <p className="text-gray-700 mb-4">{selectedArtwork.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArtwork.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="text-blue-500 text-sm font-medium hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">Comments</h3>
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-800">{comment.user}</span>
                            <span className="text-sm text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <button className="text-sm text-gray-500 hover:text-gray-700">Like</button>
                            <button className="text-sm text-gray-500 hover:text-gray-700">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FriendView;
