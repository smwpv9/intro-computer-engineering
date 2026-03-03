# Number guessing game

 MAIN:
	# Load random number
	lui a1, 0x00022
	lw a1, 0(a1)
	andi a1, a1, 0x7F

	jal   MAIN_LOOP

	j  QUIT

 QUIT:
	halt

# a1: the string to parse
# Returns: a1 = the parsed number, or -1 if INVALID
 PARSE_NUM:
	# t0 = current number
	# t1 = char
	# t2 = scratch/final answer
	mv t0, zero
	# Check empty string
	lb t1, 0(a1)
	addi t2, t1, -10
	beq t2, zero,  PARSE_NUM_ERROR
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
	    beq t1, zero,  PARSE_NUM_END

	    # Check if it's in the bounds of a num
	    addi t1, t1, -38
	    blt t1, zero,  PARSE_NUM_ERROR
	    addi t2, zero, 10
	    bge t1, t2,  PARSE_NUM_ERROR
	    # Add to t0 and LOOP
	    add t0, t0, t1
	    j  PARSE_NUM_LOOP

     PARSE_NUM_ERROR:
	addi t2, zero, -1

     PARSE_NUM_END:
	add a1, t2, zero
	ret

# a1: addr of null terminated string
# a2: if 0, don't print newline, otherwise do
PRINT_STRING:
	# Get char, end if it's null
	lb t0, 0(a1)
	beq t0, zero, PRINT_STRING_END
	# Print char
	lui t1, 0x00021
	sb t0, 24(t1)
	addi t0, zero, 0x10
	sw t0, 20(t1)
	# Increment and LOOP
	addi a1, a1, 1
	j PRINT_STRING

    PRINT_STRING_END:
	# Print newline if needed
	beq a2, zero, PRINT_STRING_RET
	addi t0, zero, 0xA # Newline
	sb t0, 24(t1)
	addi t0, zero, 0x10
	sw t0, 20(t1)

    PRINT_STRING_RET:
	ret

# a1: addr of the buffer to put the string in
# Blocks until it receives a newline (0xA)
GET_LINE:
	# Wait for status reg to say there's chars available
	lui t0, 0x00021
	addi t0, t0, 4
	lw t1, -4(t0)
	andi t1, t1, 0x10
	beq t1, zero, GET_LINE
	# Read chars (t0 = read addr, t1 = final addr, t2 = char)
	lw t1, -4(t0)
	andi t1, t1, 0xF
	addi t1, t1, 1
	add t1, t1, t0
    GET_LINE_LOOP:
	    lb t2, 0(t0)
	    sb t2, 0(a1)
	    addi t0, t0, 1
	    addi a1, a1, 1
	    bne t0, t1, GET_LINE_LOOP

	# Write back to status reg
	lui t0, 0x00021
	sw zero, 0(t0)
	# Check if we found \n
	addi t0, zero, 0xA
	bne t0, t2, GET_LINE
	# Leave
	sb zero, 0(a1)
	ret

  MAIN_LOOP:
	# Save registers
	addi sp, sp, -4
	sw ra, 0(sp)
	# Load some values
	add s0, a1, zero # s0 = target
	lui s1, %hi(BUFFER)
	addi s1, s1, %lo(BUFFER) 
	j LOOP

	# Print out INVALID PROMPT
    INVALID:
	    lui a1, %hi(ERROR)
	    addi a1, a1, %lo(ERROR)
	    addi a2, zero, 1
	    jal PRINT_STRING
	    # Print out PROMPT
    LOOP:
	    lui a1, %hi(PROMPT)
	    addi a1, a1, %lo(PROMPT)
	    addi a2, zero, 0
	    jal PRINT_STRING
	    # Get number
	    add a1, s1, zero
	    jal GET_LINE
	    # Parse
	    add a1, s1, zero
	    jal  PARSE_NUM
	    add s2, a1, zero

	    # Print out the same number if valid, error if not
	    addi t0, zero, 129
	    bgeu a1, t0, INVALID
	    add a1, s1, zero
	    jal PRINT_STRING

	    # Print out if guess was correct, or it needs to be higher or lower
	    addi a2, zero, 1
	    beq s0, s2, PRINT_SUCCESS
	    blt s0, s2, PRINT_LOWER
	    # Higher
	        lui a1, %hi(HIGHER)
	        addi a1, a1, %lo(HIGHER)
	        jal PRINT_STRING
	        j LOOP

	    # Lower
        PRINT_LOWER:
	        lui a1, %hi(LOWER)
	        addi a1, a1, %lo(LOWER)
	        jal PRINT_STRING
	        j LOOP

	# Success
    PRINT_SUCCESS:
	lui a1, %hi(SUCCESS)
	addi a1, a1, %lo(SUCCESS)
	jal PRINT_STRING

	# Return
	lw ra, 0(sp)
	addi sp, sp, 4
	ret

PROMPT: .string "Enter a number (0-128): "
ERROR: .string "Number not valid! Please try again"
SUCCESS: .string "Congrats! You guessed it :)"
HIGHER: .string "Just a little bit higher"
LOWER: .string "A smidgen lower"
BUFFER: .string "Buffer string so there's space to store inputs"
