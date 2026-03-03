# The bubble sort algorithm
.origin 0x0001_0000
MAIN:
	lui a0, %hi(ARRAY)
    addi a0, a0, %lo(ARRAY) # Low is optional
    lui a1, %hi(ARRAY_LEN)
    lw a1, %lo(ARRAY_LEN)(a1)
	jal SORT # ra is assumed if no register is given
	j QUIT

SWAP:
	slli t1, a1, 2 # reg t1 = k * 4
	add t1, a0, t1 # reg t1 = v + (k * 4)
	lw t0, 0(t1) # reg t0 (temp) = v[k]
	lw t2, 4(t1) # reg t2 = v[k + 1]
	sw t2, 0(t1) # v[k] = reg t2
	sw t0, 4(t1) # v[k + 1] = reg t0 (temp)
	ret 

# paramaters: a0: address of array, a1: length of array
SORT:
	# Callee saving registers 
    lui t0, %hi(SORT_SAVE_REGS)
    addi t0, t0, %lo(SORT_SAVE_REGS)
	sw ra, 16(t0) 
	sw s6, 12(t0) 
	sw s5, 8(t0) 
	sw s4, 4(t0) 
	sw s3, 0(t0) 

	# Procedure Body
	mv s5, a0 # copy parameter v into s5 (address of array)
	mv s6, a1 # copy parameter n into s6 (length of array)

	mv s3, zero # i = 0
	FOR_I:
	    bge s3, s6, END_FOR_I # go to endForI if i >= n
		addi s4, s3, -1 # j = i - 1
		FOR_J:
		    blt s4, r0, END_FOR_J # go to endForJ if j < 0
			slli t0, s4, 2 # t0 = j * 4
			add t0, s5, t0 # t0 = v + (j * 4)
			lw t1, 0(t0) # t1 = v[j]
			lw t2, 4(t0) # t2 = v[j + 1]
			bge t2, t1, END_FOR_J # go to endForJ if t1 < t2

			mv a0, s5 # first swap parameter is v
			mv a1, s4 # second swap parameter is j
			jal ra, SWAP # call swap
		    addi s4, s4, -1 # j -= 1
		    j FOR_J
		END_FOR_J:
	    addi s3, s3, 1 # i += 1
	    j FOR_I
	END_FOR_I:

	# Callee restoring registers
    lui t0, %hi(SORT_SAVE_REGS)
    addi t0, t0, %lo(SORT_SAVE_REGS)
	lw s3, 0(t0) # restore s3
	lw s4, 4(t0) # restore s4
	lw s5, 8(t0) # restore s5
	lw s6, 12(t0) # restore s6
	lw ra, 16(t0) # restore return addres

	ret

# Reserving memory to callee save registers
SORT_SAVE_REGS: .word 0x0, 0x0, 0x0, 0x0, 0x0

QUIT:
	halt

ARRAY: .word 3, -5, 7, -2, 0, -8, 4, 1, -1, 9
ARRAY_LEN: .word 10
