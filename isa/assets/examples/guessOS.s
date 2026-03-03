# Number guessing game

MAIN:
	# Load random number
	lui a1, 0x00022
	lw a1, 0(a1)
	andi a1, a1, 0x7F
	jal MAIN_LOOP
	j QUIT

QUIT:
	halt

# a1: the string to parse
# Returns: a1 = the parsed number, or -1 if invalid
PARSE_NUM:
	# t0 = current number
	# t1 = char
	# t2 = scratch/final answer
	addi t0, zero, 0
	# Check empty string
	lb t1, 0(a1)
	addi t2, t1, -10
	beq t2, zero, PARSE_NUM_ERROR
    PARSE_NUM_LOOP:
	    # Multiply t0 by 10 (but store previous val in t2)
	    add t2, t0, zero
	    slli t1, t0, 3
	    slli t0, t0, 1
	    add t0, t0, t1
	    # Load char
	    lb t1, 0(a1)
	    addi a1, a1, 1

	    # Check if it's a newline, and end if so
	    addi t1, t1, -10
	    beq t1, zero, PARSE_NUM_END

	    # Check if it's in the bounds of a num
	    addi t1, t1, -38
	    blt t1, zero, PARSE_NUM_ERROR
	    addi t2, zero, 10
	    bge t1, t2, PARSE_NUM_ERROR

        # Add to t0 and loop
        add t0, t0, t1
        j PARSE_NUM_LOOP

    PARSE_NUM_ERROR:
    addi t2, zero, -1

    PARSE_NUM_END:
	add a1, t2, zero
	ret


MAIN_LOOP:
	# Save registers
    lui t0, %hi(MAIN_LOOP_SAVE_REG)
    addi t0, t0, %lo(MAIN_LOOP_SAVE_REG)
	sw ra, 0(t0)
	# Load some values
	add s0, a1, zero # s0 = target
	lui s1, %hi(BUFFER)
	addi s1, s1, %lo(BUFFER)
	j LOOP

	# Print out invalid PROMPT
    INVALID:
	    lui a1, %hi(ERROR)
	    addi a1, a1, %lo(ERROR)
	    addi a2, zero, 1
	    # Print out PROMPT
        addi a0, zero, 11
        ecall
    LOOP:
	    lui a1, %hi(PROMPT)
	    addi a1, a1, %lo(PROMPT)
	    addi a2, zero, 0
        addi a0, zero, 11
        ecall
	    # Get number
	    add a1, s1, zero
	    addi a0, zero, 21
        ecall

	    # Parse
	    add a1, s1, zero
	    jal PARSE_NUM
	    add s2, a1, zero
	    # Print out the same number if valid, error if not
	    addi t0, zero, 129
	    bgeu a1, t0, INVALID
	    add a1, s1, zero
        addi a0, zero, 11
        ecall

	    # Print out if guess was correct, or it needs to be higher or lower
	    addi a2, zero, 1
	    beq s0, s2, PRINT_SUCCESS
	    blt s0, s2, PRINT_LOWER
	    # Higher
	        lui a1, %hi(HIGHER)
	        addi a1, a1, %lo(HIGHER)
            addi a0, zero, 11
            ecall
	        j LOOP
	    # Lower
        PRINT_LOWER:
	        lui a1, %hi(LOWER)
	        addi a1, a1, %lo(LOWER)
            addi a0, zero, 11
            ecall
	        j LOOP

    # Success
    PRINT_SUCCESS:
	lui a1, %hi(SUCCESS)
	addi a1, a1, %lo(SUCCESS)
    addi a0, zero, 11
    ecall

	# Return
    lui t0, %hi(MAIN_LOOP_SAVE_REG)
    addi t0, t0, %lo(MAIN_LOOP_SAVE_REG)
	lw ra, 0(t0)
	ret

MAIN_LOOP_SAVE_REG: .word 0x0

PROMPT: .string "Enter a number (0-128): "
ERROR: .string "Number not valid! Please try again"
SUCCESS: .string "Congrats! You guessed it :)"
HIGHER: .string "Just a little bit higher"
LOWER: .string "A smidgen lower"
BUFFER: .string "Buffer string so there's space to store inputs"
