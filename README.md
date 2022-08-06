# the sound of rain.

_My sister always told me that ghosts aren't real. That when we die we just disappear. Forever._

You can [play the game in your browser in itch.io](https://qteatime.itch.io/the-sound-of-rain).


## Implementation

This game uses [an unreleased version of Crochet](https://github.com/qteatime/crochet), with a new version of the Novella library.

The new version combines ideas from visual novels and parser-based interactive fiction, which is the kind of presentation this game goes for. The parser-based IF part is backed by the usual path-dependent logic database and stochastic simulation subsystems in Crochet.

As far as organisation goes:

  - `source/presentation.crochet` and `source/describe.crochet` have a few
    game-specific extensions to Novella and Crochet.

  - `source/mode.crochet` defines the logic database that underlies the
    simulation. The design is only slightly influenced by the ideas in
    engines like Inform 7, but it's more guided by the logic-based simulation.

  - `source/action.crochet` defines the possible actions the player can take
    in the attic for the simulation subsystem.

  - `source/main.crochet` sets up the game and libraries, as well as contains
    most of the game directing bits: prologue, epilogue, and the setup of
    the simulation are all there.

Some of the decisions taken here are really more of a consequence of the work necessary in abstracting over logical predicates and maintaining computed/indexing relations not being done yet.


## About

`the sound of rain.` is a short visual novel/parser-based interactive fiction about death made for the [O2A2 jam](https://itch.io/jam/o2a2-2022). I tried to explore different themes around death this time, so a little beyond the usual losing someone close to you.

There's technically only one ending, but the things you do when exploring the attic affect parts of your ending as well.


## Credits

**Writing / Programming / Art**: Q.

**Music**: https://freesound.org/people/straget/


## Licence

The source code in this repository is released under the MIT licence.
The images are released under the [CC-BY](http://creativecommons.org/licenses/by/4.0/) licence.
