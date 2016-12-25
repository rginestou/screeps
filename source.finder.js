var sourceFinder = {
	run: function(creep, searchForDrops=true) {
		// Update the target
		var dropped = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY)
		if (dropped) {
			creep.memory.droppedId = dropped.id
		} else {
			creep.memory.droppedId = undefined
		}

		var target = Game.getObjectById(creep.memory.targetId)
		// If empty, find another if reached before ticks
		if (target.energy == 0) {
			var newSource = creep.pos.findClosestByRange(FIND_SOURCES, {
				filter: (source) => {
                    return (source.id != target.id);
                }
			})
			if (creep.pos.getRangeTo(newSource) < target.ticksToRegeneration) {
				target = newSource
				creep.memory.targetId = target.id
			}
		}

		var dropped = Game.getObjectById(creep.memory.droppedId)

		if (searchForDrops && dropped && !creep.pos.isNearTo(target)) {
			if (creep.pickup(dropped) == ERR_NOT_IN_RANGE) {
				creep.moveTo(dropped);
			}
		} else {
			if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		}
	}
}

module.exports = sourceFinder;